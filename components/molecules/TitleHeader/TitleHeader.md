# TitleHeader 컴포넌트 가이드

## 기본 정보
TitleHeader는 화면 상단에 위치하는 제목 표시줄 컴포넌트입니다. 뒤로 가기 버튼, 타이틀, 그리고 우측 액션 버튼을 포함할 수 있습니다.

## Import 방법
```tsx
import { TitleHeader } from '@/components/molecules';
```

## Props 명세
```typescript
interface TitleHeaderProps extends WithChildren {
    children: string;                 // 헤더 타이틀 텍스트
    showBackButton?: boolean;         // 뒤로가기 버튼 표시 여부
    backButtonText?: string;          // 뒤로가기 버튼 텍스트 (선택)
    rightContent?: React.ReactNode;   // 우측 영역 커스텀 요소
}
```

## 스타일 스펙

### 컨테이너
- 높이: 56px
- 배경색: `Color[theme].surface`
- 하단 보더: 1px solid `Color[theme].border`
- 패딩: 좌우 16px

### 타이틀
- 폰트 크기: 18px
- 폰트 굵기: SemiBold (600)
- 색상: `Color[theme].text`
- 정렬: 중앙

### 뒤로가기 버튼
- 아이콘 크기: 24x24px
- 터치 영역: 44x44px
- 색상: `Color[theme].text`

## 사용 예시

### 기본 사용
```tsx
<TitleHeader>프로필</TitleHeader>
```

### 뒤로가기 버튼 포함
```tsx
<TitleHeader showBackButton>설정</TitleHeader>
```

### 뒤로가기 텍스트 커스텀
```tsx
<TitleHeader 
    showBackButton 
    backButtonText="홈으로"
>
    상세 정보
</TitleHeader>
```

### 우측 액션 버튼 추가
```tsx
<TitleHeader
    rightContent={
        <TouchableOpacity onPress={handleSave}>
            <Text>저장</Text>
        </TouchableOpacity>
    }
>
    글쓰기
</TitleHeader>
```

### 전체 기능 활용
```tsx
<TitleHeader
    showBackButton
    backButtonText="이전"
    rightContent={
        <View style={styles.rightButtons}>
            <IconButton name="share" onPress={handleShare} />
            <IconButton name="more" onPress={handleMore} />
        </View>
    }
>
    상세 보기
</TitleHeader>
```