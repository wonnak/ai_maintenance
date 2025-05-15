import OpenAI from "openai";
import fs from "fs/promises";
import path from "path";

const openai = new OpenAI({
  apiKey: "", // OpenAI API 키 입력
});

async function getLatestFailedHtml(tcName: string) {
  const baseDir = path.join('ai_api', 'htmls', tcName);
  const subdirs = await fs.readdir(baseDir, { withFileTypes: true });

  const timestampDirs = subdirs
    .filter(d => d.isDirectory() && /^\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}$/.test(d.name))
    .map(d => d.name)
    .sort();

  if (timestampDirs.length === 0) {
    throw new Error(`❌ ${tcName}: 실패 HTML 타임스탬프 디렉토리를 찾을 수 없습니다.`);
  }

  const latestDir = timestampDirs[timestampDirs.length - 1];
  const fullPath = path.join(baseDir, latestDir);
  const files = await fs.readdir(fullPath);

  const htmls = files
    .filter(f => /^\d{3}\.html$/.test(f))
    .sort();

  if (htmls.length === 0) {
    throw new Error(`❌ ${tcName}: ${latestDir} 디렉토리에 HTML 파일이 없습니다.`);
  }

  const lastHtml = htmls[htmls.length - 1];
  const failedHtmlPath = path.join(fullPath, lastHtml);
  const failedHtmlNumber = path.parse(lastHtml).name;

  return { failedHtmlPath, failedHtmlNumber };
}

async function getMatchingSuccessHtml(tcName: string, htmlNumber: string) {
  const successHtmlPath = path.join('ai_api', 'htmls', tcName, 'lastSuccessHtmls', `${htmlNumber}.html`);
  try {
    await fs.access(successHtmlPath);
    return successHtmlPath;
  } catch {
    throw new Error(`❌ ${tcName}: 성공 HTML 파일(${htmlNumber}.html)를 찾을 수 없습니다.`);
  }
}

async function findSpecFileContainingTest(tcName: string): Promise<string> {
  const testsDir = path.join('ai_api', 'tests');
  const files = await fs.readdir(testsDir);
  const tsFiles = files.filter(f => f.endsWith('.ts'));

  for (const file of tsFiles) {
    const filePath = path.join(testsDir, file);
    const content = await fs.readFile(filePath, 'utf-8');

    const testRegex = new RegExp(`test\\(['"\`]${tcName}['"\`]`);
    if (testRegex.test(content)) {
      return filePath;
    }
  }

  throw new Error(`❌ ${tcName}: 해당 테스트를 포함한 스크립트 파일을 찾을 수 없습니다.`);
}

async function run() {
  const failedTestPath = 'ai_api/fails/failed_tests.txt';
  const diffFolder = 'diffs';
  const responseFolder = 'responses';

  await fs.mkdir(diffFolder, { recursive: true });
  await fs.mkdir(responseFolder, { recursive: true });

  const failedTestsRaw = await fs.readFile(failedTestPath, 'utf-8');
  const testCases = failedTestsRaw.split('\n').map(line => line.trim()).filter(Boolean);

  for (const tcName of testCases) {
    console.log(`🔍 처리 중: ${tcName}`);

    try {
      const { failedHtmlPath, failedHtmlNumber } = await getLatestFailedHtml(tcName);
      const successHtmlPath = await getMatchingSuccessHtml(tcName, failedHtmlNumber);
      const specFilePath = await findSpecFileContainingTest(tcName);

      const files = {
        prompt: await fs.readFile('ai_api/prompt.md', 'utf-8'),
        success: await fs.readFile(successHtmlPath, 'utf-8'),
        failed: await fs.readFile(failedHtmlPath, 'utf-8'),
        log: await fs.readFile(`ai_api/fails/${tcName}.log`, 'utf-8'),
        spec: await fs.readFile(specFilePath, 'utf-8'),
      };

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: 'system',
                content: '당신은 TypeScript 기반 Playwright 테스트 전문가이며, 실패한 테스트스크립트를 신뢰성 있게 수정하는 것이 당신의 역할입니다.',
            },
            {
                role: 'user',
                content: '다음에 제시된 각 파일은 테스트 실패 분석을 위한 자료입니다. 주석을 참고하여 역할에 맞게 분석하고 스크립트를 개선하십시오.',
            },
            {
                role: 'user',
                content: `📝 프롬프트 설명 파일 (AI 작업 지시 문서):\n\n${files.prompt}`,
            },
            {
                role: 'user',
                content: `📄 Playwright 실행 로그 (.log 파일):\n\n${files.log}`,
            },
            {
                role: 'user',
                content: `✅ 성공한 테스트 시점의 HTML:\n\n${files.success}`,
            },
            {
                role: 'user',
                content: `❌ 실패한 테스트 시점의 HTML:\n\n${files.failed}`,
            },
            {
                role: 'user',
                content: `🧪 테스트 스크립트 파일 (.spec.ts):\n\n${files.spec}`,
            },
        ],
      });

      const content = completion.choices[0].message.content || '';

      // 전체 응답 저장
      const responsePath = path.join(responseFolder, `${tcName}.json`);
      await fs.writeFile(responsePath, JSON.stringify({ content }, null, 2), 'utf-8');
      console.log(`📝 응답 저장 완료: ${responsePath}`);

      // diff 블럭 추출
      const diffMatches = [...content.matchAll(/@@ [^\n]* @@[\s\S]+?(?=(\n@@ |\n*$))/g)];

      if (diffMatches.length > 0) {
        let combinedDiff = diffMatches.map(m => m[0].trim()).join('\n\n');
        const lines = combinedDiff.split('\n');

        // '---' 또는 '```' 이후 줄 제거
        const cutoffIndex = lines.findIndex(line => line.trim() === '---' || line.trim() === '```');
        const slicedLines = cutoffIndex !== -1 ? lines.slice(0, cutoffIndex) : lines;

        // const filtered = slicedLines.filter(line => {
        //   const trimmed = line.trim();
        //   return trimmed.startsWith('@@') || trimmed.startsWith('+') || trimmed.startsWith('-');
        // });

        //let finalDiff = filtered.join('\n');
        let finalDiff = slicedLines.join('\n');
        if (!finalDiff.endsWith('\n')) {
          finalDiff += '\n';
        }

        const diffPath = path.join(diffFolder, `${tcName}.diff`);
        await fs.writeFile(diffPath, finalDiff, 'utf-8');
        console.log(`✅ minimal diff 저장 완료: ${diffPath}`);
      } else {
        console.warn(`⚠️ ${tcName}: diff 블럭을 찾지 못했습니다.`);
      }

    } catch (err) {
      console.error(`❌ ${tcName} 처리 실패:`, err.message);
    }
  }
}

run().catch(console.error);