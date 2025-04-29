import type { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import fs from 'fs';
import path from 'path';
import stripAnsi from 'strip-ansi';
import * as unzipper from 'unzipper';

class LogOnFailReporter implements Reporter {
  private failedTests: string[] = [];  // 실패한 테스트 이름들만 저장

  onTestBegin(test: TestCase) {
    console.log(`Test started: ${test.title}`);
    const isRunByVSCode = !!process.env.VSCODE_CWD; // VSCode에서 실행 중이면 true
    console.log(`isRunVyVSCode : ${isRunByVSCode}`)
  }

  onTestEnd(test: TestCase, result: TestResult) {
    
    if (result.status === 'failed' || result.status === 'timedOut') {
      // 실패한 테스트만 이름 저장
      this.failedTests.push(test.title);
    }
  }

  async onEnd(result: FullResult) {
    const isRunByVSCode = !!process.env.VSCODE_CWD; // VSCode에서 실행 중이면 true
    console.log(`isRunVyVSCode : ${isRunByVSCode}`)
    if (isRunByVSCode) {
      console.log('Skipped LogOnFailReporter during VSCode test run.');
      return;
    }
    
    try {
      const outputDir = path.join(process.cwd(), 'fails');
      fs.mkdirSync(outputDir, { recursive: true });

      // 실패한 테스트 제목만 저장하는 파일 생성
      // 알파벳과 숫자 오름차순으로 정렬
      this.failedTests.sort((a, b) => {
        // 숫자와 문자 순으로 정렬
        return a.localeCompare(b, 'en', { numeric: true });
      });

      // 정렬된 실패한 테스트 제목을 'failed_tests.txt'에 기록
      const failedTestsFilePath = path.join(outputDir, 'failed_tests.txt');
      fs.writeFileSync(failedTestsFilePath, this.failedTests.join('\n'), 'utf-8');
      console.log(`Failed tests list saved: ${failedTestsFilePath}`);

      // data 폴더의 zip 파일들을 모두 찾기
      const dataDir = path.join(process.cwd(), 'playwright-report', 'data');
      let files: string[] = [];
      if (fs.existsSync(dataDir)) {
        files = fs.readdirSync(dataDir);
      }

      for (const file of files) {
        const zipPath = path.join(dataDir, file);
        if (zipPath.endsWith('.zip')) {
          // zip 파일을 풀기
          const directory = await unzipper.Open.file(zipPath);
          const hashFiles = directory.files.filter((d) => d.path.endsWith(''));

          // 각 해시파일을 읽어서 필요한 정보 추출
          for (const file of hashFiles) {
            const content = await file.buffer();
            const contentStr = content.toString();

            // 실패한 테스트 이름에 맞는 항목만 찾기
            const testInfoMatch = contentStr.match(/# Test info.*?Name: (.*?)\s.*?# Error details/s);
            if (testInfoMatch && testInfoMatch[1] && this.failedTests.includes(testInfoMatch[1])) {
              const testCaseName = testInfoMatch[1];

              // 로그 내용 생성
              const errorDetails = contentStr.match(/# Error details.*?```(.*?)```/s);
              const logContent = `
Test Case: ${testCaseName}
Test Info: ${testInfoMatch[0]}
Error Details: ${errorDetails ? errorDetails[1] : 'No details'}
              `;

              // 파일로 저장
              const logFilePath = path.join(outputDir, `${testCaseName}.log`);
              fs.writeFileSync(logFilePath, logContent, 'utf-8');
              console.log(`Log saved: ${logFilePath}`);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error processing the Playwright data:', error);
    }
  }
}

export default LogOnFailReporter;