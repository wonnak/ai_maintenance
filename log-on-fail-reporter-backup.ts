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
    
    onTestEnd(test: TestCase, result: TestResult) {
        if (result.status === 'failed' || result.status === 'timedOut') {
            try {
                // 1. ANSI 코드 제거 및 객체 복제
                const cleanError = result.error ? {
                ...result.error,
                message: stripAnsi(result.error.message || ''),
                stack: stripAnsi(result.error.stack || ''),
                snippet: stripAnsi(result.error.snippet || '')
                } : null;
        
                // 2. 저장 디렉토리 생성
                const outputDir = path.join(process.cwd(), 'fails');
                fs.mkdirSync(outputDir, { recursive: true });
        
                // 3. 안전한 파일명 생성
                //const safeTestName = test.title.replace(/[^a-z0-9]/gi, '_');
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                //const filename = `error_${safeTestName}_${timestamp}.json`;
                const filename = `${test.title}.json`;
        
                // 4. JSON으로 변환 (순환 참조 처리 포함)
                const jsonString = JSON.stringify(
                    {
                        testTitle: test.title,
                        status: result.status,
                        error: cleanError,
                        duration: result.duration
                    },
                    (key, value) => {
                        // 순환 참조 처리
                        if (typeof value === 'object' && value !== null) {
                        if (key === 'test' || key === 'result') return '[Circular]';
                        }
                        return value;
                    },
                    2  // 들여쓰기 2칸
                );
    
                // 5. 파일 저장
                fs.writeFileSync(path.join(outputDir, filename), jsonString, 'utf-8');
                console.log(`Error saved to: ${path.join(outputDir, filename)}`);
            } catch (error) {
                console.error('Failed to save test error:', error);
            }
        }
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