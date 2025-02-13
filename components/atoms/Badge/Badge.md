# Badge 컴포넌트 가이드

## 기본 정보

Badge 컴포넌트는 상태나 카테고리를 시각적으로 표현하기 위한 경량 UI 요소입니다.
라운드 처리된 배경에 텍스트를 표시하며, 다양한 크기와 색상 변형을 지원합니다.

## import 방법

```tsx
import { Badge, BadgeVariant, BadgeSize } from '@/components/atoms';
```

### Props 타입 정의

```tsx
interface BadgeProps {
    children: ReactNode; // 뱃지 내부 텍스트 (필수)
    variant?: BadgeVariant; // 뱃지 스타일 변형 (기본값: BRAND)
    size?: BadgeSize; // 뱃지 크기 (기본값: MEDIUM)
}
```

## 사이즈별 스펙
SMALL: 
- 패딩: 상하 2px, 좌우 6px
- 폰트 크기: 10px

MEDIUM (기본값):
- 패딩: 상하 4px, 좌우 8px
- 폰트 크기: 12px

LARGE:
- 패딩: 상하 6px, 좌우 12px
- 폰트 크기: 14px

## Variant 종류
- BRAND: 브랜드 컬러를 사용한 기본 스타일
- SUCCESS: 성공/완료 상태 표시
- WARNING: 경고/주의 상태 표시
- DANGER: 위험/에러 상태 표시

### 사용 예시
```tsx
// 기본 사용
<Badge>기본 뱃지</Badge>

// 크기 변경
<Badge size={BadgeSize.SMALL}>작은 뱃지</Badge>
<Badge size={BadgeSize.LARGE}>큰 뱃지</Badge>

// 변형 사용
<Badge variant={BadgeVariant.SUCCESS}>완료</Badge>
<Badge variant={BadgeVariant.WARNING}>주의</Badge>
<Badge variant={BadgeVariant.DANGER}>오류</Badge>

// 조합 사용
<Badge variant={BadgeVariant.SUCCESS} size={BadgeSize.LARGE}>
  크게 표시된 완료
</Badge>
```