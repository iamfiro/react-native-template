# Label 컴포넌트 가이드

## 기본 정보
Label 컴포넌트는 입력 필드나 섹션의 제목을 표시하기 위한 기본적인 텍스트 요소입니다. 필수 입력 표시, 크기 조절, 상태 변경 등을 지원합니다.

## Import 방법
```typescript
import { Label, LabelSize, LabelStatus } from '@/components/atoms/Label';
```

## Props 명세
```typescript
export interface LabelProps extends WithChildren {
    essential?: boolean;    // 필수 입력 표시 여부
    size?: LabelSize;      // 라벨 크기 (SMALL | MEDIUM)
    status?: LabelStatus;  // 라벨 상태 (DEFAULT | DISABLED)
}
```

## 스타일 스펙

### Size별 스타일

**SMALL**
- 폰트 크기: 12px
- 줄 높이: 18px
- 자간: -0.2px
- 폰트 패밀리: Regular
- 패딩: 없음

**MEDIUM (기본값)**
- 폰트 크기: 14px
- 줄 높이: 20px
- 자간: -0.3px
- 폰트 패밀리: Regular
- 패딩: 없음

### Status별 스타일

**DEFAULT**
- 텍스트 색상: Color[theme].text
- 불투명도: 100%

**DISABLED**
- 텍스트 색상: Color[theme].textDisabled
- 불투명도: 30%

### Essential 표시 스타일
- 텍스트: '*'
- 색상: Color[theme].textError
- 위치: 라벨 텍스트 우측 4px 간격
- 폰트 크기: 라벨 텍스트와 동일

## 사용 예시

```tsx
// 기본 사용
<Label>이름</Label>

// 필수 입력 표시
<Label essential>이메일 주소</Label>

// 작은 크기
<Label size={LabelSize.SMALL}>작은 라벨</Label>

// 비활성화 상태
<Label status={LabelStatus.DISABLED}>비활성화된 라벨</Label>

// 조합 사용
<Label 
    essential 
    size={LabelSize.SMALL} 
    status={LabelStatus.DEFAULT}
>
    필수 입력 항목
</Label>
```

## 유의사항
1. children은 필수 prop으로, 반드시 제공되어야 함
2. 라벨 텍스트는 한 줄로 제한되며 말줄임(...) 처리되지 않음
3. 직접적인 style prop 전달은 지원하지 않음