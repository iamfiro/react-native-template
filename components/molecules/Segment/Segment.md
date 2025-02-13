# Segment 컴포넌트 가이드

## 기본 정보
Segment 컴포넌트는 여러 옵션 중 하나를 선택할 수 있는 탭 스타일의 UI 컴포넌트입니다. iOS의 SegmentedControl과 유사한 디자인과 사용성을 제공합니다.

## Import 방법
```tsx
import { Segment } from '@/components/molecules';
```

## Props 명세
```typescript
interface SegmentOption {
    label: string;    // 표시될 텍스트
    value: string;    // 선택 시 반환될 값
}

interface SegmentProps {
    options: SegmentOption[];              // 선택 옵션 배열
    value: string;                         // 현재 선택된 값
    onChange: (value: string) => void;     // 선택 변경 핸들러
    disabled?: boolean;                    // 비활성화 상태
}
```

## 스타일 스펙

### 컨테이너
- 높이: 36px
- 배경색: `Color[theme].surfaceSecondary`
- 테두리: 없음
- 테두리 반경: 8px
- 패딩: 4px

### 옵션 아이템
- 높이: 28px
- 패딩: 좌우 16px
- 정렬: 중앙
- 폰트: 14px, Medium (500)

**활성화 상태**
- 배경색: `Color[theme].surface`
- 텍스트 색상: `Color[theme].textBrand`
- 그림자: Y축 1px, 블러 2px, `rgba(0, 0, 0, 0.08)`

**비활성화 상태**
- 배경색: 투명
- 텍스트 색상: `Color[theme].textTertiary`

## 사용 예시

### 기본 사용법
```tsx
const [selected, setSelected] = useState('all');

<Segment
    options={[
        { label: '전체', value: 'all' },
        { label: '진행중', value: 'inProgress' },
        { label: '완료', value: 'completed' }
    ]}
    value={selected}
    onChange={setSelected}
/>
```

### 비활성화 상태
```tsx
<Segment
    options={[
        { label: '월간', value: 'monthly' },
        { label: '연간', value: 'yearly' }
    ]}
    value="monthly"
    onChange={handleChange}
    disabled
/>
```

### 필터링 컴포넌트로 활용
```tsx
const FilterSection = () => {
    const [filter, setFilter] = useState('all');

    return (
        <Segment
            options={[
                { label: '전체', value: 'all' },
                { label: '인기순', value: 'popular' },
                { label: '최신순', value: 'recent' }
            ]}
            value={filter}
            onChange={value => {
                setFilter(value);
                refreshList(value);
            }}
        />
    );
};
```

## 애니메이션 스펙
- 선택 변경 시 슬라이딩 애니메이션
  - 지속 시간: 200ms
  - 이징: spring(mass: 0.8, stiffness: 400)
- 배경색 변경: 150ms ease-in-out
- 텍스트 색상 변경: 150ms ease-in-out

## 베스트 프랙티스
1. 2-5개 사이의 옵션 권장
2. 간단하고 명확한 라벨 사용
3. 옵션 길이가 비슷한 것끼리 그룹화
4. 논리적 순서로 옵션 배치
5. 가장 자주 사용되는 옵션을 첫 번째로 배치

## 사용 시 주의사항
1. 모바일에서 터치 영역 충분히 확보
2. 옵션 라벨은 한 줄로 제한
3. 긴 텍스트는 말줄임(...) 처리
4. 런타임에 옵션 추가/제거 지양