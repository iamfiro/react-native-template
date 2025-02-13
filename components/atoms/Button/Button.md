# Button 컴포넌트 가이드

## 기본 정보

Button 컴포넌트는 사용자 상호작용을 위한 기본적인 터치 요소입니다.
다양한 크기와 스타일 변형을 지원하며, 로딩 상태와 비활성화 상태를 표현할 수 있습니다.

## import 방법

```tsx
import { Button, ButtonVariant, ButtonSize } from '@/components/atoms';
```

## Props 타입 정의

```tsx
interface ButtonProps {
    children: ReactNode;                 // 버튼 내부 콘텐츠 (필수)
    variant?: ButtonVariant;            // 버튼 스타일 변형 (기본값: BRAND)
    size?: ButtonSize;                  // 버튼 크기 (기본값: LARGE)
    isPending?: boolean;                // 로딩 상태
    disabled?: boolean;                 // 비활성화 상태
    onPress?: () => void;              // 터치 이벤트 핸들러
}
```

## 크기별 스펙

### SMALL
- 패딩: 상하 8px, 좌우 16px
- 폰트 크기: 14px
- 높이: 32px

### MEDIUM
- 패딩: 상하 12px, 좌우 20px
- 폰트 크기: 16px
- 높이: 40px

### LARGE (기본값)
- 패딩: 상하 16px, 좌우 24px
- 폰트 크기: 18px
- 높이: 48px

## Variant 종류

### BRAND (기본)
- 배경: 브랜드 컬러
- 텍스트: 흰색
- 용도: 주요 행동 버튼

### SECONDARY
- 배경: 보조 컬러
- 텍스트: 브랜드 컬러
- 용도: 보조 행동 버튼

### SUCCESS
- 배경: 성공 컬러
- 텍스트: 흰색
- 용도: 완료/확인 버튼

### OUTLINE
- 배경: 투명
- 테두리: 브랜드 컬러
- 텍스트: 브랜드 컬러
- 용도: 경계선이 있는 버튼

## 특수 상태

### 로딩 상태 (isPending)
- ActivityIndicator 표시
- 터치 불가능
- 색상은 variant에 따라 자동 조정

### 비활성화 상태 (disabled)
- 투명도 50% 적용
- 터치 불가능

## 애니메이션
- 터치 시 스케일 축소 애니메이션 (0.95)
- 네이티브 드라이버 사용으로 성능 최적화

## 사용 예시

### 기본 사용
```tsx
<Button onPress={() => console.log('pressed')}>
  <Text>기본 버튼</Text>
</Button>
```

### 크기 변경
```tsx
<Button size={ButtonSize.SMALL}>
  <Text>작은 버튼</Text>
</Button>

<Button size={ButtonSize.LARGE}>
  <Text>큰 버튼</Text>
</Button>
```

### 변형 사용
```tsx
<Button variant={ButtonVariant.SECONDARY}>
  <Text>보조 버튼</Text>
</Button>

<Button variant={ButtonVariant.SUCCESS}>
  <Text>성공 버튼</Text>
</Button>

<Button variant={ButtonVariant.OUTLINE}>
  <Text>외곽선 버튼</Text>
</Button>
```

### 상태 표현
```tsx
// 로딩 상태
<Button isPending>
  <Text>로딩 중...</Text>
</Button>

// 비활성화 상태
<Button disabled>
  <Text>비활성화 버튼</Text>
</Button>
```

### 조합 사용
```tsx
<Button 
  variant={ButtonVariant.SUCCESS} 
  size={ButtonSize.LARGE}
  onPress={() => console.log('success!')}
>
  <Text>크게 표시된 성공 버튼</Text>
</Button>
```