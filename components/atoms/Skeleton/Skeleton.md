# Skeleton 컴포넌트 가이드

## 기본 정보
Skeleton 컴포넌트는 데이터 로딩 상태를 표시하는 UI 요소입니다. 콘텐츠가 로드되기 전 플레이스홀더로 사용되며, 자연스러운 로딩 애니메이션을 제공합니다.

## Import 방법
```typescript
import { Skeleton } from '@/components/atoms';
```

## Props 명세
```typescript
export interface SkeletonProps {
    width?: DimensionValue;     // 너비 값
    height?: number;            // 높이 값 (픽셀)
    borderRadius?: number;      // 테두리 둥글기 (픽셀)
    style?: ViewStyle;         // 추가 스타일
    fullWidth?: boolean;       // 전체 너비 사용
    fullHeight?: boolean;      // 전체 높이 사용
    fullRadius?: boolean;      // 최대 테두리 둥글기 사용
}
```

## 스타일 스펙

### 기본 스타일
- 배경색: `Color[theme].surfaceSecondary`
- 애니메이션: 좌에서 우로 반복되는 그라데이션 효과
- 기본 높이: 20px
- 기본 테두리 둥글기: 4px

### 크기 옵션
1. **고정 크기**
   - width와 height prop으로 직접 지정
   - 픽셀 또는 퍼센트 단위 사용 가능

2. **전체 크기**
   - `fullWidth`: 부모 컨테이너의 전체 너비
   - `fullHeight`: 부모 컨테이너의 전체 높이

3. **테두리 둥글기**
   - `borderRadius`: 직접 픽셀값 지정
   - `fullRadius`: true일 경우 height/2 값으로 설정 (완전한 원형)

## 사용 예시

### 기본 사용
```tsx
// 기본 크기
<Skeleton />

// 커스텀 크기
<Skeleton width={100} height={24} />

// 전체 너비
<Skeleton fullWidth height={40} />

// 원형 스켈레톤
<Skeleton width={48} height={48} fullRadius />

// 커스텀 스타일
<Skeleton 
    width={200} 
    height={32}
    borderRadius={8}
    style={{ marginVertical: 8 }}
/>
```

### 일반적인 사용 패턴

```tsx
// 텍스트 로딩
<Skeleton width={200} height={20} />

// 아바타 로딩
<Skeleton width={40} height={40} fullRadius />

// 카드 로딩
<View style={{ gap: 8 }}>
    <Skeleton fullWidth height={200} />
    <Skeleton fullWidth height={20} />
    <Skeleton width="60%" height={16} />
</View>
```

## 애니메이션 스펙
- 타입: Linear gradient 애니메이션
- 지속 시간: 1.5초
- 반복: 무한
- 방향: 좌 → 우
- 그라데이션:
  - 시작: `rgba(255, 255, 255, 0.05)`
  - 중간: `rgba(255, 255, 255, 0.15)`
  - 끝: `rgba(255, 255, 255, 0.05)`

## 성능 최적화
- React Native Reanimated 사용
- 하드웨어 가속 활성화
- 불필요한 리렌더링 방지를 위한 메모이제이션

## 접근성
- accessibilityRole="progressbar" 적용
- accessibilityLabel="로딩 중" 설정
- accessibilityState={{ busy: true }} 적용

## 제한사항
1. 직접적인 자식 요소를 포함할 수 없음
2. 애니메이션은 비활성화할 수 없음
3. width가 지정되지 않은 경우 기본값 100px 적용

## 테마 통합
```tsx
const theme = useTheme();
const backgroundColor = Color[theme].surfaceSecondary;
const highlightColor = Color[theme].surfaceTertiary;
```

## 베스트 프랙티스
1. 실제 콘텐츠와 유사한 크기로 설정
2. 로딩 상태가 길어질 경우에만 사용
3. 적절한 간격과 레이아웃 유지
4. 과도한 중첩 사용 피하기