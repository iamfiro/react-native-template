# HStack 컴포넌트 가이드

## 소개

HStack(Horizontal Stack)은 요소들을 수평으로 배치하기 위한 편의성 컴포넌트입니다. React Native의 Flexbox를 보다 직관적으로 사용할 수 있게 해주며, 웹 개발자들에게 친숙한 CSS Flexbox 경험을 제공합니다.

## 사용 목적

1. **코드 가독성 향상**
   - `flexDirection: 'row'`를 매번 작성하는 대신 의미있는 이름의 컴포넌트 사용
   - 레이아웃 의도를 명확하게 전달

2. **일관된 스타일링**
   - 간격(spacing)과 정렬(alignment) 관련 속성 통일
   - 프로젝트 전반의 레이아웃 일관성 유지

3. **생산성 향상**
   - 자주 사용되는 flex 속성들의 단순화
   - 반복적인 코드 작성 감소

## import 방법

```tsx
import { HStack } from '@/components/atoms';
```

## Props 타입 정의

```tsx
interface HStackProps {
    children: ReactNode;
    spacing?: number;                    // 요소간 간격
    justify?: FlexJustifyContent;        // 수평 정렬
    align?: FlexAlignItems;             // 수직 정렬
    wrap?: FlexWrap;                    // 줄바꿈 처리
    reversed?: boolean;                  // 역순 배치
}
```

## 활용 가이드

### 1. 기본적인 수평 나열
아이콘과 텍스트를 나란히 배치할 때 유용합니다.

```tsx
// 아이콘 + 텍스트 조합
<HStack spacing={8} align="center">
    <Icon name="star" />
    <Text>즐겨찾기</Text>
</HStack>
```

### 2. 목록 아이템 구성
리스트 아이템의 내부 요소들을 배치할 때 활용됩니다.

```tsx
// 프로필 아이템 예시
<HStack justify="space-between" align="center">
    <HStack spacing={12}>
        <Avatar size="small" />
        <Text>사용자명</Text>
    </HStack>
    <Button>팔로우</Button>
</HStack>
```

### 3. 폼 요소 배치
입력 필드와 버튼을 나란히 배치할 때 사용됩니다.

```tsx
// 검색창 예시
<HStack spacing={8}>
    <TextInput style={{ flex: 1 }} />
    <Button>검색</Button>
</HStack>
```

### 4. 헤더 구성
앱 헤더나 섹션 헤더를 구성할 때 유용합니다.

```tsx
// 헤더 예시
<HStack justify="space-between" align="center">
    <Text variant="h1">섹션 제목</Text>
    <Button variant="text">더보기</Button>
</HStack>
```

## 사용 시 주의사항

1. **성능 고려사항**
   - 많은 자식 요소를 포함할 경우 FlatList 사용 고려
   - 불필요한 중첩 사용 피하기

2. **반응형 레이아웃**
   - `wrap="wrap"` 속성 활용하여 화면 크기에 따른 줄바꿈 처리
   - 자식 요소의 크기 제한 고려

3. **접근성**
   - 논리적인 요소 배치 순서 유지
   - `reversed` 속성 사용 시 접근성 고려

## 실제 활용 예시

### 1. 네비게이션 바
```tsx
<HStack justify="space-between" align="center">
    <HStack spacing={16}>
        <IconButton icon="menu" />
        <Text variant="h1">홈</Text>
    </HStack>
    <HStack spacing={12}>
        <IconButton icon="search" />
        <IconButton icon="notifications" />
        <IconButton icon="settings" />
    </HStack>
</HStack>
```

### 2. 카드 푸터
```tsx
<HStack justify="space-between" align="center">
    <HStack spacing={16}>
        <LikeButton />
        <CommentButton />
        <ShareButton />
    </HStack>
    <BookmarkButton />
</HStack>
```

### 3. 필터 영역
```tsx
<HStack spacing={8} wrap="wrap">
    <Chip label="전체" />
    <Chip label="인기" />
    <Chip label="최신" />
    <Chip label="팔로잉" />
</HStack>
```

## 대체 가능한 방법들

1. **일반 View 사용**
```tsx
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
    {/* 자식 요소들 */}
</View>
```

2. **Box 컴포넌트 사용**
```tsx
<Box direction="row" align="center">
    {/* 자식 요소들 */}
</Box>
```

HStack을 사용하면 이러한 반복적인 스타일링 코드를 줄이고, 
더 명확하고 일관된 레이아웃 코드를 작성할 수 있습니다.