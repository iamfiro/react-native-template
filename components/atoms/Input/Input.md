# Input 컴포넌트 가이드

## 기본 정보

Input 컴포넌트는 React Native의 TextInput을 확장한 커스텀 입력 필드입니다.
테마 시스템을 지원하며, 포커스 애니메이션과 아이콘 통합을 제공합니다.

## import 방법

```tsx
import { Input } from '@/components/atoms';
```

## Props 타입 정의

```tsx
import { TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {
    error?: boolean;               // 에러 상태 표시
    leadingIcon?: ReactNode;       // 입력창 좌측 아이콘
}
```

## 스타일 스펙
- 높이: 56px
- 패딩: 좌우 14px
- 테두리 반경: 16px
- 폰트 크기: 15px
- 폰트 패밀리: PretendardMedium

## 상태 종류

### Normal
- 테두리: Color[theme].border
- 테두리 두께: 1px
- 아이콘 색상: Color[theme].textSecondary

### Focused
- 테두리: Color[theme].borderBrand
- 테두리 두께: 2px
- 아이콘 색상: Color[theme].text
- 포커스 애니메이션 적용

### Error
- 테두리: Color[theme].borderError
- 테두리 두께: 2px

## 사용 예시

### 기본 사용
```tsx
<Input
    placeholder="텍스트를 입력하세요"
    onChangeText={(text) => console.log(text)}
/>
```

### 아이콘과 함께 사용
```tsx
<Input
    placeholder="검색어를 입력하세요"
    leadingIcon={<SearchIcon size={24} />}
/>
```

### 에러 상태
```tsx
<Input
    placeholder="이메일 주소"
    error={true}
    value={email}
    onChangeText={setEmail}
/>
```

### TextInput Props 사용
```tsx
<Input
    placeholder="비밀번호"
    secureTextEntry
    autoCapitalize="none"
    autoCorrect={false}
    maxLength={16}
/>
```

## 주의사항

1. **ref 사용**
```tsx
const inputRef = useRef<InputRef>(null);

<Input
    ref={inputRef}
    placeholder="포커스 테스트"
/>
```

2. **TextInput 속성**
- TextInput의 모든 props를 지원합니다
- 커스텀 스타일은 style prop으로 전달 가능

3. **테마 시스템**
- 자동으로 현재 테마에 맞는 색상 적용
- 직접 색상 지정은 권장하지 않음

4. **아이콘 사용**
- leadingIcon은 자동으로 테마 색상 적용
- React 엘리먼트만 지원

5. **포커스 관리**
- 자동 포커스 애니메이션 처리
- 수동 포커스는 ref를 통해 제어

## 성능 최적화

1. **애니메이션**
- 네이티브 드라이버 미사용 (테두리 애니메이션)
- 최적화된 타이밍 설정 (200ms)

2. **리렌더링**
- 상태 변경 최소화
- 불필요한 props 전달 방지