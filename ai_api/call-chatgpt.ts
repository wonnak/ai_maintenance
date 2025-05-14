import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

async function callChatGPT() {
  const files = {
    prompt: await fs.readFile('ai_api/prompt.md', 'utf-8'),
    success: await fs.readFile('ai_api/success.html', 'utf-8'),
    failed: await fs.readFile('ai_api/failed.html', 'utf-8'),
    log: await fs.readFile('ai_api/TC_0001_login_naverWebSite.log', 'utf-8'),
    spec: await fs.readFile('ai_api/naver.spec.ts', 'utf-8'),
  };

  const messages = [
    {
      role: 'system',
      content: '당신은 TypeScript 기반 Playwright 테스트 전문가이며, 실패한 테스트스크립트를 신뢰성 있게 수정하는 것이 당신의 역할입니다.',
    },
    {
      role: 'user',
      content: '첨부한 prompt.md 프롬프트 파일과 관련 추가 파일들을 참고하여 실패한 테스트스크립트를 수정하시오.',
    },
    {
      role: 'user',
      content: files.prompt,
    },
    {
      role: 'user',
      content: files.success,
    },
    {
      role: 'user',
      content: files.failed,
    },
    {
      role: 'user',
      content: files.log,
    },
    {
      role: 'user',
      content: files.spec,
    },
  ];

  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-4o',
    messages,
    temperature: 0.2,
    max_tokens: 2000,
  }, {
    headers: {
      Authorization: '',
      'Content-Type': 'application/json',
    },
  });

  console.log("..start..")
  console.log(response.data.choices[0].message);
  console.log("..end..")
}

callChatGPT().catch(console.error);