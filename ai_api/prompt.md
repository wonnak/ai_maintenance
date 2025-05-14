# AI 기반 스크립트 유지보수 프롬프트

---

### 🔧 목적:

테스트스크립트는 아래 명령어로 실행됩니다.

```
npx playwright test tests/naver.spec.ts
```

---

### ✅ 테스트스크립트 유지보수를 위한 레퍼런스
- 실패한 최근 테스트 정보: TC_0001_login_naverWebSite.log (Playwright 에러 메시지 포함)
- 실패한 최근 테스트의 가장 마지막 HTML 파일: failed.html
- 성공한 최근 테스트의 HTML 파일: success.html (가장 마지막 성공 시점 기준)
- **성공한 테스트 스크립트 (정답 기준):** `tests/naver.spec.ts`

---


### ⚠️ 필수 전제 사항

- `tests/naver.spec.ts`는 **정상적으로 작동했던 성공 기준 테스트 스크립트**입니다.  
  → **이 파일은 기준 스크립트이며, 함부로 변경하지 말고 필요한 selector, 대기 조건 등만 제한적으로 보완하세요.**

- 유지보수 목적은 **현재 실패한 테스트 상황을 success 상태와 비교하여 필요한 최소한의 수정만 가하는 것**입니다.

---

### 💡 레퍼런스 참고 순서 (작업 흐름 순으로 진행)

1. **success.html vs failed.html 구조 비교**
   - 두 HTML 파일 간의 구조/속성 차이를 먼저 확인하세요.
   - 특히 다음 요소의 변화 여부를 중심으로 분석합니다:
     - DOM 트리 구조 (element 위치, 포함 관계 등)
     - `role`, `aria-label`, `aria-labelledby`, `placeholder`, `textContent`, `for/id` 관계
     - 숨겨진 요소 여부 (`display: none` 등)

   ✅ 이 비교에서 **selector 또는 접근 방식이 달라진 부분을 가장 우선적으로 수정 대상으로 고려합니다.**

2. **TC_0001_login_naverWebSite.log 확인**
   - Playwright 에러 메시지로 인해 정확히 어떤 selector에서 실패했는지, 어떤 동작이 실패했는지 파악합니다.
   - 에러 종류 예시:
     - `Timeout`, `Element not found`, `Element is not visible`, `not enabled`, `detached from DOM`, `navigation timeout`

3. **성공 기준 테스트 스크립트 분석 (`naver.spec.ts`)**
   - 실패한 위치에 해당하는 테스트 케이스를 찾으세요.
   - success 기준 selector, 동작 흐름을 유지하며, 에러 로그(.log 파일)과 관련된 필요한 부분만 최소한으로 개선합니다.

---

### 🛠 요청사항:

- 웹페이지 구조의 변화로 인해 실패한 테스트 코드의 **해당 부분만 최소한으로 수정**합니다.
- 즉 에러 로그(.log 파일)에서 직접 언급된 선택자 라인만 수정하세요.
- success.html과 failed.html을 비교할 때, 에러 로그와 무관한 요소는 절대 변경하지 마세요.
- 모든 수정은 반드시 success/failed.html의 차이점과 에러 로그를 교차 검증 후 실행하세요.
- 테스트의 목적은 **그대로 유지**되어야 합니다.
- **성공한 테스트 스크립트는 기준**으로 사용되며, 전체 흐름이나 의도를 변경하지 않습니다.
- **Selector 함수는 다음 우선순위를 반드시 따릅니다 (상단 함수 우선 사용):**
  1. `page.getByRole()`
  2. `page.getByText()`
  3. `page.getByLabel()`
  4. `page.getByPlaceholder()`
  5. `page.locator()` ← 이 함수는 위 함수들로 식별이 불가능한 경우에만 사용하세요.
- 가능한 경우 `<button>`, `<link>`, `<textbox>` 등의 role 속성 확인 후 `page.getByRole()` 사용을 우선 고려하세요.
- AI가 `page.locator`를 기본적으로 사용하는 것을 방지하기 위해, **명시적 우선순위 준수는 필수**입니다.

---

## 📤 출력 포맷:

- 수정 이후 아래의 정보를 보여줘야 합니다.

```ts
// ✅ 수정된 Playwright 테스트 코드 (전체 또는 수정된 함수/섹션)
[수정된 코드]

```
// ✨ 수정 요약
- 어떤 코드 라인을 어떤 이유로 수정했는지 간단하게 설명
- 실패 원인과 HTML 구조 변화에 대한 설명
- 추가로 테스트의 안정성을 높일 수 있는 개선사항이 있다면 함께 제안.
```

---

## 📚 참고: [Playwright selectors 공식 문서](https://playwright.dev/docs/selectors)
