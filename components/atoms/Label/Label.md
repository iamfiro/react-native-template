# Label 컴포넌트 가이드

## 기본 정보

Label 컴포넌트는 UI 요소의 의미나 용도를 설명하는 텍스트 레이블을 제공합니다.
주로 입력 필드나 폼 요소와 함께 사용되며, 접근성을 고려한 디자인을 제공합니다.

## import 방법

```tsx
import { Label, LabelSize, LabelVariant } from '@/components/atoms';
```

## Props 타입 정의

```tsx
interface LabelProps {
    children: ReactNode;                 // 레이블 텍스트 (필수)
    htmlFor?: string;                   // 연결된 입력 요소의 ID
    size?: LabelSize;                   // 레이블 크기 (기본값: MEDIUM)
    variant?: LabelVariant;             // 레이블 스타일 변형 (기본값: PRIMARY)
    required?: boolean;                 // 필수 입력 표시
    disabled?: boolean;                 // 비활성화 상태
    error?: boolean;                    // 오류 상태
}
```

## 크기별 스펙

### SMALL
- 폰트 크기: 12px
- 줄 높이: 16px
- 마진 하단: 4px

### MEDIUM (기본값)
- 폰트 크기: 14px
- 줄 높이: 20px
- 마진 하단: 6px

### LARGE
- 폰트 크기: 16px
- 줄 높이: 24px
- 마진 하단: 8px

## Variant 종류

### PRIMARY (기본)
- 색상: Color[theme].text
- 폰트 두께: Medium

### SECONDARY
- 색상: Color[theme].textSecondary
- 폰트 두께: Regular

### ERROR
- 색상: Color[theme].textError
- 폰트 두께: Medium

## 상태별 스타일

### Required
- 레이블 텍스트 뒤에 빨간색 '*' 표시
- 필수 입력 항목임을 시각적으로 표현

### Disabled
- 투명도: 0.5
- 클릭/터치 불가능 상태

### Error
- 텍스트 색상: Color[theme].textError
- 오류 상태 시각적 표현

## 사용 예시

### 기본 사용
```tsx
<Label>이름</Label>
```

### 크기 변경
```tsx
<Label size={LabelSize.SMALL}>작은 레이블</Label>
<Label size={LabelSize.LARGE}>큰 레이블</Label>
```

### 변형 사용
```tsx
<Label variant={LabelVariant.SECONDARY}>보조 레이블</Label>
<Label variant={LabelVariant.ERROR}>오류 레이블</Label>
```

### 필수 입력 표시
```tsx
<Label required>비밀번호</Label>
```

### 입력 필드와 함께 사용
```tsx
<VStack spacing={4}>
    <Label htmlFor="email" required>이메일</Label>
    <Input
        id="email"
        placeholder="이메일을 입력하세요"
        error={hasError}
    />
</VStack>
```

## 주의사항

1. **접근성**
- htmlFor 속성을 사용하여 입력 요소와 연결
- 적절한 색상 대비 유지
- 충분한 터치 영역 확보

2. **텍스트 스타일링**
- 직접적인 스타일 변경 대신 variant 사용
- 테마 시스템 활용

3. **레이아웃**
- VStack과 함께 사용하여 일관된 간격 유지
- 입력 필드와의 적절한 여백 확보

4. **상태 관리**
- 연결된 입력 필드의 상태와 동기화
- 오류 상태 명확한 표현

## 응용 예시

### 폼 필드 그룹
```tsx
<VStack spacing={16}>
    <VStack spacing={4}>
        <Label required>사용자명</Label>
        <Input placeholder="사용자명을 입력하세요" />
    </VStack>
    <VStack spacing={4}>
        <Label required>이메일</Label>
        <Input 
            placeholder="example@email.com"
            keyboardType="email-address"
        />
    </VStack>
</VStack>
```

### 체크박스 레이블
```tsx
<HStack spacing={8} align="center">
    <Checkbox id="terms" />
    <Label htmlFor="terms" size={LabelSize.SMALL}>
        이용약관에 동의합니다
    </Label>
</HStack>
```

### 그룹 레이블
```tsx
<VStack spacing={8}>
    <Label variant={LabelVariant.SECONDARY}>
        개인정보
    </Label>
    <VStack spacing={16}>
        <Input placeholder="이름" />
        <Input placeholder="전화번호" />
    </VStack>
</VStack>
```