import type {
    Reporter,
    TestCase,
    TestResult,
    FullResult
  } from '@playwright/test/reporter';
  import fs from 'fs';
  import path from 'path';
  import stripAnsi from 'strip-ansi';
  
  class LogOnFailReporter implements Reporter {
    private logMap = new Map<string, string[]>();
  
    onTestBegin(test: TestCase) {
      // 초기화
      console.log(`Test on`);
      this.logMap.set(test.id, []);
    }
  
    onStdOut(chunk: string | Buffer, test?: TestCase) {
        console.log(`Test onStdOut`);
      if (test) {
        this.logMap.get(test.id)?.push(chunk.toString());
      }
    }
  
    onStdErr(chunk: string | Buffer, test?: TestCase) {
      console.log(`Test onStdErr`);
      if (test) {
        this.logMap.get(test.id)?.push(chunk.toString());
      }
    }
  
    async onTestEnd(test: TestCase, result: TestResult) {
      console.log(`Test ended: ${test.title}`);
      console.log(`Test result: ${result.status}`);
      //if (result.status === 'failed') {
      if (result.status === 'failed' || result.status === 'timedOut') {
        //console.log(result);
        console.log(result.error?.snippet);
        // for (const error of result.errors) {
        //     console.log('🔴 Error message:', error.message);
        //   }
        const testName = test.titlePath().join(' - ').replace(/[^\w\d-]/g, '_');
        const dir = path.join(process.cwd(), 'fails');
        //const filePath = path.join(dir, `${testName}.log`);
        const filePath = path.join(dir, `${test.title}.log`);
        console.log(`filePath: ${filePath}`);

        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
  
        // 여기서 에러 메시지 추출
        const errorMessage = result.error?.message || 'No error message';
        const errorStack = result.error?.stack || '';
        const fullLog = `${errorMessage}\n\n${errorStack}`;

        fs.writeFileSync(filePath, fullLog, 'utf-8');
      }
  
      // 로그 메모리 정리
      this.logMap.delete(test.id);
    }
  
    onEnd(result: FullResult) {
      // 전체 테스트 종료 후 동작 (필요 시)
    }
  }
  
  export default LogOnFailReporter;


// class LogOnFailReporter implements Reporter {
//     private currentTestName = '';
//     private stdoutOutput = '';
//     private stderrOutput = '';
//     private originalStdoutWrite = process.stdout.write;
//     private originalStderrWrite = process.stderr.write;
  
//     onTestBegin(test: TestCase) {
//       this.currentTestName = test.title;
//       this.stdoutOutput = '';
//       this.stderrOutput = '';
  
//       process.stdout.write = ((chunk: any, encoding?: any, callback?: any) => {
//         this.stdoutOutput += chunk.toString();
//         return this.originalStdoutWrite.call(process.stdout, chunk, encoding, callback);
//       }) as any;
  
//       process.stderr.write = ((chunk: any, encoding?: any, callback?: any) => {
//         this.stderrOutput += chunk.toString();
//         return this.originalStderrWrite.call(process.stderr, chunk, encoding, callback);
//       }) as any;
//     }
  
//     onTestEnd(test: TestCase, result: TestResult) {
//       // stdout/stderr 복원 먼저!
//       process.stdout.write = this.originalStdoutWrite;
//       process.stderr.write = this.originalStderrWrite;
  
//       if (result.status === 'failed' || result.status === 'timedOut') {
//         const dir = path.join(process.cwd(), 'fails');
//         if (!fs.existsSync(dir)) {
//           fs.mkdirSync(dir, { recursive: true });
//         }
//         const filePath = path.join(dir, `${this.currentTestName}.log`);
//         const combinedOutput = `=== STDOUT ===\n${this.stdoutOutput}\n\n=== STDERR ===\n${this.stderrOutput}`;
//         fs.writeFileSync(filePath, combinedOutput, 'utf-8');
//       }
//     }
//   }
  
//   export default LogOnFailReporter;