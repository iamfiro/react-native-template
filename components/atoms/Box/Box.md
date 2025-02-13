# Box 컴포넌트 가이드

## 기본 정보

Box 컴포넌트는 레이아웃을 구성하는 가장 기본적인 컨테이너 컴포넌트입니다.
Flexbox 기반으로 동작하며, 방향, 정렬, 간격 등 다양한 레이아웃 속성을 제공합니다.

## import 방법

```tsx
import { Box } from '@/components/atoms';
```

## Props 타입 정의

```tsx
interface BoxStyleProps {
    bgColor?: VariantColorType; // 배경색 (Color 토큰)
    fullWidth?: boolean; // 너비 100% 설정
    fullHeight?: boolean; // 높이 100% 설정
}

interface BoxFlexProps {
    direction?: 'row' | 'column'; // 방향
    justify?:
        | 'center'
        | 'flex-start'
        | 'flex-end'
        | 'space-between'
        | 'space-around'; // 주축 정렬
    align?: 'center' | 'flex-start' | 'flex-end' | 'stretch'; // 교차축 정렬
    wrap?: 'wrap' | 'nowrap'; // 줄바꿈 처리
    gap?: number; // 내부 요소 간격
}

type BoxProps = BoxStyleProps &
    BoxFlexProps &
    (BoxViewProps | BoxTouchableProps);
```

## 주요 기능

### 1. 레이아웃 타입

- `as="view"`: 일반 View로 렌더링 (기본값)
- `as="hoverable"`: 터치 가능한 컴포넌트로 렌더링

### 2. 방향 설정

- `direction="row"`: 가로 방향 정렬
- `direction="column"`: 세로 방향 정렬 (기본값)

### 3. 정렬

주축 정렬 (justify):

- `justify="flex-start"`: 시작점 정렬 (기본값)
- `justify="center"`: 중앙 정렬
- `justify="flex-end"`: 끝점 정렬
- `justify="space-between"`: 균등 간격
- `justify="space-around"`: 요소 주변 균등 간격

교차축 정렬 (align):

- `align="stretch"`: 늘이기 (기본값)
- `align="center"`: 중앙 정렬
- `align="flex-start"`: 시작점 정렬
- `align="flex-end"`: 끝점 정렬

### 4. 크기 설정

- `fullWidth`: 가로 너비 100%
- `fullHeight`: 세로 높이 100%

### 5. 간격과 줄바꿈

- `gap`: 내부 요소 사이 간격 설정
- `wrap`: 내부 요소 줄바꿈 처리

## 사용 예시

```tsx
<Box>
    <Text>기본 박스</Text>
</Box>
```

레이아웃 설정

```tsx
// 가로 방향, 중앙 정렬
<Box direction="row" justify="center" align="center">
  <Text>아이템 1</Text>
  <Text>아이템 2</Text>
</Box>

// 세로 방향, 요소 간 간격 설정
<Box direction="column" gap={16}>
  <Text>아이템 1</Text>
  <Text>아이템 2</Text>
</Box>
```

interactive Box

```tsx
<Box
    as="hoverable"
    onPress={() => console.log('pressed')}
    bgColor="surfaceSecondary"
>
    <Text>터치해보세요</Text>
</Box>
```

크기 및 스타일 설정

```tsx
<Box
    fullWidth
    bgColor="surfaceBrand"
    style={{
        padding: 16,
        borderRadius: 8,
    }}
>
    <Text>전체 너비 박스</Text>
</Box>
```

## 주의사항 및 팁

1. 성능 최적화

- 불필요한 중첩을 피하세요
- 큰 리스트의 경우 FlatList와 함께 사용하세요

2. 스타일링

- 직접적인 색상 값 대신 bgColor prop을 사용하세요
- 복잡한 스타일은 style prop을 활용하세요

3. 접근성

- 터치 영역이 충분히 큰지 확인하세요 (최소 44x44)
