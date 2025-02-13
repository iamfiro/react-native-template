# Typo 컴포넌트 가이드

## 기본 정보
Typo 컴포넌트는 일관된 타이포그래피를 제공하는 기본 텍스트 컴포넌트입니다. 다양한 크기, 굵기, 색상을 지원하며 텍스트 스타일링을 위한 기본 빌딩 블록으로 사용됩니다.

## Import 방법
```typescript
import { Typo, TypoWeight } from '@/components/atoms';
```

## Props 명세
```typescript
interface TypoProps extends WithChildren, ComponentPropsForTest, TypoStyleProps {
    size?: number;            // 폰트 크기
    weight?: TypoWeight;      // 폰트 굵기
    style?: TextStyle;        // 추가 스타일
    color?: VariantColorType; // 텍스트 색상
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    numberOfLines?: number;
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
    maxWidth?: boolean;       // 최대 너비 적용 여부
}
```

## 폰트 굵기 옵션
```typescript
enum TypoWeight {
    Regular = 400,    // 기본 텍스트
    Medium = 500,     // 중간 강조
    SemiBold = 600,   // 준강조
    Bold = 700,       // 강조
}
```

## 스타일 스펙

### 폰트 크기별 스타일
- 기본값: 14px
- 권장 크기:
  - 헤더: 20px 이상
  - 본문: 14px-16px
  - 캡션: 12px
  - 작은 텍스트: 10px

### 행간 규칙
- 기본 lineHeight = fontSize * 1.5
- 헤더용 lineHeight = fontSize * 1.3
- 캡션용 lineHeight = fontSize * 1.4

### 자간
- 기본값: -0.3px
- 큰 텍스트(20px 이상): -0.5px
- 작은 텍스트(12px 이하): -0.2px

## 사용 예시

### 기본 사용
```tsx
// 기본 텍스트
<Typo>기본 텍스트입니다</Typo>

// 크기 지정
<Typo size={20}>큰 텍스트</Typo>
<Typo size={12}>작은 텍스트</Typo>

// 굵기 지정
<Typo weight={TypoWeight.Bold}>굵은 텍스트</Typo>
<Typo weight={TypoWeight.Medium}>중간 굵기 텍스트</Typo>

// 색상 지정
<Typo color="textSecondary">부가 설명</Typo>
<Typo color="textBrand">브랜드 텍스트</Typo>

// 정렬 지정
<Typo textAlign="center">가운데 정렬</Typo>

// 여러 줄 처리
<Typo numberOfLines={2} ellipsizeMode="tail">
    매우 긴 텍스트를 두 줄까지만 표시하고 말줄임표로 처리합니다...
</Typo>

// 스타일 조합
<Typo 
    size={16}
    weight={TypoWeight.SemiBold}
    color="textBrand"
    textAlign="center"
>
    스타일이 조합된 텍스트
</Typo>
```

## 접근성 고려사항
- 최소 폰트 크기 10px 유지
- 충분한 색상 대비 제공
- 가독성을 위한 적절한 행간 유지
- 스크린리더 지원을 위한 적절한 마크업


## 제한사항
1. `children`은 텍스트 또는 텍스트를 반환하는 함수만 허용
2. 직접적인 fontFamily 변경 불가
3. 기본 제공되는 TypoWeight 외 굵기 사용 불가

## 베스트 프랙티스
1. 일관된 폰트 크기 사용
2. 적절한 굵기로 정보 계층 표현
3. 테마 시스템의 색상 활용
4. 가독성을 고려한 행간 설정