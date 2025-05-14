// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: "",
// });

// const completion = openai.chat.completions.create({
//   model: "gpt-4o-mini",
//   store: true,
//   messages: [
//     {"role": "user", "content": "write a haiku about ai"},
//   ],
// });

// completion.then((result) => console.log(result.choices[0].message));

import OpenAI from "openai";
import fs from "fs/promises";

const openai = new OpenAI({
  apiKey: "",
});

async function run() {
  const files = {
    prompt: await fs.readFile('ai_api/prompt.md', 'utf-8'),
    success: await fs.readFile('ai_api/success.html', 'utf-8'),
    failed: await fs.readFile('ai_api/failed.html', 'utf-8'),
    log: await fs.readFile('ai_api/TC_0001_login_naverWebSite.log', 'utf-8'),
    spec: await fs.readFile('ai_api/naver.spec.ts', 'utf-8'),
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
        content: '첨부한 prompt.md 프롬프트 파일과 관련 추가 파일들을 참고하여 실패한 테스트스크립트를 수정하시오.',
      },
      { role: 'user', content: files.prompt },
      { role: 'user', content: files.success },
      { role: 'user', content: files.failed },
      { role: 'user', content: files.log },
      { role: 'user', content: files.spec },
    ],
  });

  console.log(completion.choices[0].message);
}

run().catch(console.error);