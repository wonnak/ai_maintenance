import fs from 'fs';
import path from 'path';
import { argv } from 'process';

interface TestSpec {
  title: string;
  ok: boolean;
  file: string;
  tests: {
    results: {
      status: string; // 'passed' | 'failed' | 'timedOut'
    }[];
  }[];
}

interface TestResult {
  suites: {
    file: string;
    specs: TestSpec[];
  }[];
}

function parseArg(key: string): string {
  const prefix = `--${key}=`;
  const arg = argv.find((arg) => arg.startsWith(prefix));
  if (!arg) throw new Error(`Missing argument --${key}`);
  return arg.slice(prefix.length);
}

function loadJson(filePath: string): TestResult {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

function extractTestMap(data: TestResult): Map<string, { status: string; file: string }> {
  const map = new Map<string, { status: string; file: string }>();
  for (const suite of data.suites) {
    for (const spec of suite.specs) {
      const tcName = spec.title;
      const status = spec.tests[0]?.results[0]?.status;
      const filePath = suite.file;
      if (status) {
        map.set(tcName, { status, file: filePath });
      }
    }
  }
  return map;
}

function getTargetTcs(
  prev2Map: Map<string, { status: string; file: string }>,
  prevMap: Map<string, { status: string; file: string }>
): string[] {
  const targets: string[] = [];
  for (const [tc, { status: prevStatus, file }] of prevMap.entries()) {
    const oldEntry = prev2Map.get(tc);
    if (status === 'failed' || status === 'timedOut') {
      if (!oldEntry || oldEntry.status === 'passed') {
        targets.push(`${tc}|${file}`);
      }
    }
  }
  return targets;
}

function main() {
  const prevPath = parseArg('prev');
  const prev2Path = parseArg('prev2');
  const outPath = parseArg('out');

  const prevData = loadJson(prevPath);
  const prev2Data = loadJson(prev2Path);

  const prevMap = extractTestMap(prevData);   // 최신 빌드
  const prev2Map = extractTestMap(prev2Data); // 전전 빌드

  const targetTcs = getTargetTcs(prev2Map, prevMap);

  fs.writeFileSync(outPath, targetTcs.join('\n'), 'utf-8');
  console.log(`[compare_results.ts] ${targetTcs.length} TC(s) marked for AI patching.`);
}

main();
