# Components Reference

Atomic Design structure. Base path: `components/`.

## Atoms (`components/atoms/`)

| Component | Path | Purpose |
|---|---|---|
| Avatar | `atoms/Avatar/` | Profile image/initials display |
| Badge | `atoms/Badge/` | Status indicator badge |
| Box | `atoms/Box/` | Layout container (View wrapper) |
| Button | `atoms/Button/` | Button. variant: brand/secondary/danger/success/warning/text. size: small/medium/large |
| Checkbox | `atoms/Checkbox/` | Checkbox input |
| Column | `atoms/Column/` | Vertical flex container |
| Divider | `atoms/Divider/` | Separator line |
| Icon | `atoms/Icon/` | Icon renderer — wraps lucide-react-native icons by name |
| Input | `atoms/Input/` | Text input. Supports error, leadingIcon |
| Label | `atoms/Label/` | Text label |
| Pressable | `atoms/Pressable/` | Touch area. Supports haptic, activeOpacity |
| Radio | `atoms/Radio/` | Radio button |
| Row | `atoms/Row/` | Horizontal flex container |
| Skeleton | `atoms/Skeleton/` | Loading placeholder |
| Spacer | `atoms/Spacer/` | Spacing utility |
| Spinner | `atoms/Spinner/` | Loading spinner |
| Switch | `atoms/Switch/` | Toggle switch |
| Typo | `atoms/Typo/` | Text rendering (Typography) |

## Molecules (`components/molecules/`)

| Component | Path | Purpose |
|---|---|---|
| Card | `molecules/Card/` | Card container. variant: default (surface+border) / white (surface, no border) / sub (surfaceContainer, no border) |
| EmptyState | `molecules/EmptyState/` | Empty state placeholder |
| ListItem | `molecules/ListItem/` | List item row. Supports leadingIcon, trailingIcon, trailingText, description, showChevron, destructive |
| MediaPreviewHeader | `molecules/MediaPreviewHeader/` | Media preview header bar |
| NavBar | `molecules/NavBar/` | Navigation bar |
| SearchBar | `molecules/SearchBar/` | Search input bar |
| Segment | `molecules/Segment/` | Segmented control |
| SocialLogin | `molecules/SocialLogin/` | Social login button group |
| Tabs | `molecules/Tabs/` | Tab navigation |
| Title | `molecules/Title/` | Title text |
| TitleHeader | `molecules/TitleHeader/` | Title + header composition |
| Toast | `molecules/Toast/` | Toast notification |

## Organisms (`components/organisms/`)

| Component | Path | Purpose |
|---|---|---|
| BottomSheet | `organisms/BottomSheet/` | Bottom sheet |
| DatePicker | `organisms/DatePicker/` | Date picker |
| ErrorBoundary | `organisms/ErrorBoundary/` | Error boundary (class component) |
| Form | `organisms/Form/` | Form. Configured via fields array. type: text/email/password/number/textarea/date |
| Modal | `organisms/Modal/` | Modal dialog |
| OnboardingScreen | `organisms/OnboardingScreen/` | Full-screen onboarding with background image, dark-blue gradient overlay, Title, and configurable action list (button / google / apple / email / custom) |
| ProfileScreen | `organisms/ProfileScreen/` | Full profile screen. Shows avatar, name, bio, stats, action buttons, and menu sections |
| SettingsScreen | `organisms/SettingsScreen/` | Settings screen. JSON-driven sections with list items. Supports `type: 'custom'` items for inserting arbitrary UI at any position. Optional `header` ReactNode above sections, `footer` text per section |

## Page Templates (`app/`)

| Page | Path | Purpose |
|---|---|---|
| Auth - Login | `app/(auth)/login.tsx` | 로그인 (email/password Form, SocialLogin, 회원가입/비밀번호찾기 링크) |
| Auth - Register | `app/(auth)/register.tsx` | 회원가입 (email/password/confirm Form, validation, 로그인 링크) |
| Auth - Forgot Password | `app/(auth)/forgot-password.tsx` | 비밀번호 찾기 (email Form, 로그인 링크) |
| Onboarding | `app/(onboarding)/index.tsx` | 프리미엄 다크 스와이프 온보딩 (3 steps, 상단 Skip ">", 하단 pagination dots + 인버티드 풀-라운드 CTA "계속/시작하기", FlatList 캐러셀) |
| Search | `app/(tabs)/search.tsx` | 검색 (back chevron + SearchBar 헤더, 최근 검색어 빈 상태, 인기 검색어 2열 랭킹 리스트 — top 3 tertiary 강조) |
| Notifications | `app/notifications.tsx` | 알림 리스트 (Korean fintech 스타일: 상단 AD 배너 카드 + "최근 7일" 섹션, 컬러 원형 아이콘 + 우측 타임스탬프, swipe-to-delete) |
| Map | `app/(tabs)/map.tsx` | 지도 레이아웃 (placeholder MapView, floating search/controls, place list) |

## Icons (`components/icon/`)

Icons are sourced from `lucide-react-native`. Import directly: `import { ChevronLeft, User } from 'lucide-react-native'`.

The `Icon` atom (`atoms/Icon/`) provides a name-based wrapper for: asterisk, calender, chevronLeft, chevronRight, chevronDown, clock, close, check, search, warning, error, info, user.

### Brand (`icon/brand/`)
google, apple

## Hooks

| Hook | Purpose |
|---|---|
| useDebounce | Debounced value helper for delayed search/input updates |
| useButtonAnimation | Button press animation |

## Import

```typescript
import { Button, Input, Box } from '@/components/atoms';
import { Card, ListItem } from '@/components/molecules';
import { Modal, Form } from '@/components/organisms';
```

## File Structure Convention

Each component directory:
- `ComponentName.tsx` - Implementation
- `ComponentName.type.ts` - Props type definition
- `index.ts` - Re-export
- `ComponentName.util.ts` - (optional) Utility helpers
