# Component Development Plan

Atomic Design 기반 RN 템플릿 컴포넌트 구현 체크리스트.
각 컴포넌트는 `ComponentName.tsx` / `ComponentName.type.ts` / `index.ts` (필요시 `.util.ts`, `.md`) 구조로 작성.

---

## Atoms

### 레이아웃 / 범용
- [x] **Divider** — 수평/수직 구분선. `direction`, `color`, `thickness` prop
- [x] **Spacer** — 빈 공간. `size` prop (HStack·VStack 내부용)

### 인터랙션
- [x] **Pressable** — Button 외 탭 영역 래퍼. `onPress`, `disabled`, `haptic` prop
- [x] **Checkbox** — 체크박스. `checked`, `onChange`, `disabled`, `label` prop / `CheckboxSize`
- [x] **Radio** — 라디오 버튼. `selected`, `onChange`, `disabled` / 단독 사용 + `Radio.Group`
- [x] **Switch** — 토글 스위치. `value`, `onChange`, `disabled` / Animated 슬라이드

### 표시
- [x] **Avatar** — 유저 이미지·이니셜 표시. `size`, `src`, `name`, `shape(circle|square)` prop / `AvatarSize` enum
- [x] **Spinner** — 로딩 인디케이터. `size`, `color` prop (ActivityIndicator 래퍼)
- [x] **Icon** — glyph/brand SVG 통합 래퍼. `name`, `size`, `color` prop

---

## Molecules

- [x] **Card** — 기본 카드 컨테이너. `Card`, `Card.Header`, `Card.Body`, `Card.Footer` compound 패턴
- [x] **ListItem** — 목록 행. `title`, `description`, `leadingIcon`, `trailingIcon`, `onPress` prop
- [x] **SearchBar** — Input + 검색 아이콘 조합. `value`, `onChange`, `onSubmit`, `placeholder` prop
- [x] **Toast** — 일시적 피드백 메시지. `ToastVariant(success|error|warning|info)`, `message`, `duration`
- [x] **Tabs** — 탭 네비게이션. `tabs`, `activeTab`, `onChange` / Segment와 달리 underline 스타일
- [x] **EmptyState** — 빈 화면 안내. `icon`, `title`, `description`, `action(button)` prop
- [ ] **MediaPreviewHeader** — `.md` 파일 추가 (현재 없음)

---

## Organisms

- [x] **BottomSheet** — 슬라이드업 모달. `visible`, `onClose`, `snapHeight`, `children` / Animated 슬라이드 + backdrop
- [x] **Modal** — 중앙 팝업. `visible`, `onClose`, `title`, `children`, `primaryAction`, `secondaryAction`
- [x] **Form** — data-driven 폼. `fields` 배열 하나로 자동 렌더링·밸리데이션·상태관리
- [x] **ErrorBoundary** — React Error Boundary. `fallback`, `onError` prop

---

## Icons (glyph 추가)

- [x] `close` (x 버튼 — Modal·Toast에 필수)
- [x] `check` (Checkbox·Toast success)
- [x] `search` (SearchBar)
- [x] `chevron_right` (ListItem trailing)
- [x] `chevron_down` (Dropdown·BottomSheet)
- [x] `warning` / `error` / `info` (Toast variants)
- [ ] `image` (Avatar fallback)
- [x] `user` (Avatar fallback)

---

## 인프라

- [ ] **ThemeProvider** 확인 — `useTheme` hook의 Provider가 app root에 있는지 검토
- [ ] **`components/index.ts`** — 최상위 배럴 export (현재 없음, atoms/molecules/organisms 각각만 있음)
- [ ] **Token 정리** — `token/` 폴더와 `constants/color.ts`의 관계 정리 문서화

---

## 구현 우선순위

```
1순위 (즉시 막힘):  BottomSheet → Modal → Checkbox/Switch → Icon 래퍼
2순위 (화면 조립):  Card → ListItem → Toast → EmptyState
3순위 (보강):       Pressable → Avatar → Tabs → SearchBar → Form → ErrorBoundary
4순위 (정리):       Divider/Spacer → glyph icons → 최상위 index.ts
```
