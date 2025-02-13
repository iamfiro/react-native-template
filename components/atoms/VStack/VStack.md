# VStack 컴포넌트 가이드

## 소개

VStack(Vertical Stack)은 요소들을 수직으로 배치하기 위한 편의성 컴포넌트입니다. Box 컴포넌트를 기반으로 하며, 수직 레이아웃을 더 직관적으로 구성할 수 있게 해줍니다.

## 사용 목적

1. **수직 레이아웃 단순화**
   - `flexDirection: 'column'` 설정을 자동화
   - 자주 사용되는 수직 배치 패턴의 표준화

2. **레이아웃 의도 명확화**
   - 코드만으로도 수직 배치를 명확하게 전달
   - 다른 개발자들과의 협업 시 이해도 향상

3. **일관된 간격 관리**
   - 요소들 간의 수직 간격을 일관되게 유지
   - spacing prop을 통한 간편한 간격 조절

## import 방법

```tsx
import { VStack } from '@/components/atoms';
```

## Props 타입 정의

```tsx
interface VStackProps {
    children: ReactNode;
    spacing?: number;                    // 요소간 수직 간격
    justify?: FlexJustifyContent;        // 수직 정렬
    align?: FlexAlignItems;             // 수평 정렬
    padding?: number | string;           // 내부 여백
    reversed?: boolean;                  // 역순 배치
}
```

## 활용 가이드

### 1. 폼 요소 배치
입력 필드들을 수직으로 배치할 때 유용합니다.

```tsx
// 로그인 폼 예시
<VStack spacing={16}>
    <TextField label="이메일" />
    <TextField label="비밀번호" type="password" />
    <Button>로그인</Button>
</VStack>
```

### 2. 카드 내부 콘텐츠
카드나 리스트 아이템의 내용을 구성할 때 활용됩니다.

```tsx
// 프로필 카드 예시
<VStack spacing={12} align="center">
    <Avatar size="large" />
    <Text variant="h2">사용자명</Text>
    <Text variant="body">상태 메시지</Text>
    <Button variant="outline">프로필 편집</Button>
</VStack>
```

### 3. 섹션 레이아웃
페이지나 화면의 섹션을 구성할 때 사용됩니다.

```tsx
// 섹션 레이아웃 예시
<VStack spacing={24}>
    <VStack spacing={16}>
        <Text variant="h1">주요 소식</Text>
        <NewsList />
    </VStack>
    <VStack spacing={16}>
        <Text variant="h1">추천 콘텐츠</Text>
        <ContentGrid />
    </VStack>
</VStack>
```

## 실제 활용 사례

### 1. 설정 메뉴
```tsx
<VStack spacing={8}>
    <SettingsItem icon="profile" label="계정 정보" />
    <SettingsItem icon="notification" label="알림 설정" />
    <SettingsItem icon="security" label="보안" />
    <SettingsItem icon="help" label="도움말" />
</VStack>
```

### 2. 상세 정보 표시
```tsx
<VStack spacing={16} align="stretch">
    <Text variant="h1">제품 상세</Text>
    <Image source={productImage} />
    <VStack spacing={8}>
        <Text variant="h2">제품명</Text>
        <Text variant="body">상세 설명</Text>
        <Text variant="h3">가격: ₩50,000</Text>
    </VStack>
    <Button>구매하기</Button>
</VStack>
```

## 주의사항

1. **성능 최적화**
   - 많은 자식 요소가 있는 경우 FlatList 사용 고려
   - 불필요한 중첩 사용 자제

2. **반응형 레이아웃**
   - 화면 크기에 따른 spacing 조절 고려
   - align prop을 활용한 적절한 정렬 설정

3. **접근성**
   - 논리적인 요소 순서 유지
   - 적절한 간격으로 요소 구분

## 대체 가능한 방법들

1. **일반 View 사용**
```tsx
<View style={{ flexDirection: 'column', gap: 16 }}>
    {/* 자식 요소들 */}
</View>
```

2. **Box 컴포넌트 직접 사용**
```tsx
<Box direction="column" gap={16}>
    {/* 자식 요소들 */}
</Box>
```

VStack을 사용하면 이러한 반복적인 스타일링 코드를 줄이고,
더 명확하고 일관된 수직 레이아웃을 구성할 수 있습니다.