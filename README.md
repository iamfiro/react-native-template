![Banner Image](/.github/images/banner.png)

# React Native Design System for Hackathon

해커톤에서 빠르게 앱을 구현하기 위해 제작된 React Native + Expo 템플릿입니다.

## Quick Start

```bash
git clone <this-repo> my-app && cd my-app
make install
make start
```

> iOS: `make ios` | Android: `make android` | Web: `make web`

## 기술 스택

| 영역 | 기술 |
|---|---|
| 프레임워크 | React Native 0.76 + Expo 52 (New Architecture) |
| 라우팅 | Expo Router (파일 기반) |
| 디자인 시스템 | Material Design 3 시맨틱 컬러 (Light/Dark) |
| HTTP | Axios (.env 기반 baseURL) |
| 푸시 알림 | Firebase Cloud Messaging + Notifee |
| 애니메이션 | React Native Reanimated |
| 아이콘 | Lucide React Native |
| 폰트 | Pretendard (4 weights) |

## 디자인 시스템 구성

Atomic Design 패턴. 자세한 스펙은 [`docs/components.md`](docs/components.md) 참조.

### Atoms — UI 기본 요소

Button, Input, Checkbox, Radio, Switch, Avatar, Badge, Spinner, Skeleton, Icon, Label, Typo, Box, Row, Column, Spacer, Divider, Pressable

### Molecules — 조합 컴포넌트

Card, ListItem, NavBar, SearchBar, Tabs, Segment, Title, TitleHeader, Toast, EmptyState, MediaPreviewHeader, SocialLogin

### Organisms — 복합 UI

Form, Modal, BottomSheet, DatePicker, ErrorBoundary, OnboardingScreen, ProfileScreen, SettingsScreen

### 사용법

```typescript
import { Button, Input, Box } from '@/components/atoms';
import { Card, ListItem } from '@/components/molecules';
import { Modal, Form } from '@/components/organisms';
```

## 프로젝트 구조

```
app/
├── (auth)/              # 인증 (로그인, 회원가입, 비밀번호 찾기)
├── (onboarding)/        # 온보딩 스와이프
├── (tabs)/              # 메인 탭 (홈, 지도, 검색, 프로필, 설정)
└── notifications.tsx    # 알림

components/
├── atoms/               # 기본 요소 (21개)
├── molecules/           # 조합 (12개)
├── organisms/           # 복합 UI (8개)
└── icon/                # 브랜드 아이콘

hooks/                   # 재사용 상태 로직
utils/                   # 순수 헬퍼
api/                     # HTTP 클라이언트
constants/               # 컬러, 정규식
types/                   # 공통 타입
```

## 내장 Hooks & Utils

| Hook | 용도 |
|---|---|
| `useDebounce` | 입력값 지연 처리 |
| `useRefreshControl` | Pull-to-refresh |
| `useTheme` | 테마 감지 (light/dark) |
| `useFcmToken` | FCM 토큰 조회 |
| `useButtonAnimation` | 버튼 프레스 애니메이션 |

| 유틸 | 용도 |
|---|---|
| `pushNotification` | FCM 알림 설정 |
| `fileSystem` | 디렉토리 생성 |
| `units/time` | 상대 시간 ("3시간 전") |
| `units/distance` | 거리 (m/km) |
| `units/largeNumber` | 큰 수 (억/만/천) |

## Make 커맨드

```bash
make help              # 전체 커맨드 목록
make start             # Expo 개발 서버
make ios / android     # 시뮬레이터 실행
make lint              # ESLint
make typecheck         # TypeScript 검사
make check             # lint + typecheck + test 한번에
make build-ios-dev     # EAS iOS 개발 빌드
make nuke              # 전체 초기화 + 재설치
```

## 컨벤션

- **컴포넌트**: Atomic Design (atoms → molecules → organisms)
- **Hooks**: `use[Domain][Action]` (예: `useFormValidation`)
- **Utils**: 도메인별 분리 (예: `utils/format.ts`)
- **타입**: Props는 `.type.ts`에 정의
- **임포트**: `@/` 경로 별칭

## 라이선스

MIT
