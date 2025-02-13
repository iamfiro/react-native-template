
# DatePicker 컴포넌트 가이드

## 기본 정보

DatePicker 컴포넌트는 날짜 선택을 위한 UI 컴포넌트입니다. iOS와 Android 플랫폼의 네이티브 DatePicker를 통합적으로 제공하며, 날짜 범위 설정과 비활성화 상태를 지원합니다.

## Import 방법

```tsx
import { DatePicker } from '@/components/organisms';
```

## Props 타입 정의

```tsx
interface DatePickerProps {
    value?: Date;                   // 선택된 날짜
    onChange?: (event: DateTimePickerEvent, date?: Date) => void;  // 날짜 변경 핸들러
    minimumDate?: Date;            // 선택 가능한 최소 날짜
    maximumDate?: Date;            // 선택 가능한 최대 날짜
    disabled?: boolean;            // 비활성화 상태
    fullWidth?: boolean;           // 전체 너비 사용
    fullRadius?: boolean;          // 완전한 원형 모서리 적용
}
```

## 사용 예시

### 기본 사용
```tsx
const [date, setDate] = useState(new Date());

<DatePicker
    value={date}
    onChange={(event, selectedDate) => {
        setDate(selectedDate || date);
    }}
/>
```

### 날짜 범위 설정
```tsx
<DatePicker
    value={date}
    onChange={handleDateChange}
    minimumDate={new Date('2024-01-01')}
    maximumDate={new Date('2024-12-31')}
/>
```

### 비활성화 상태
```tsx
<DatePicker
    value={date}
    onChange={handleDateChange}
    disabled={true}
/>
```

### 전체 너비와 모서리 설정
```tsx
<DatePicker
    value={date}
    onChange={handleDateChange}
    fullWidth
    fullRadius
/>
```

## 주의사항

1. **플랫폼 차이**
   - iOS: 모달 형태의 picker 표시
   - Android: inline 형태의 picker 표시

2. **날짜 범위**
   - `minimumDate`와 `maximumDate`는 선택적
   - 범위를 벗어난 날짜는 선택 불가능

3. **상태 관리**
   - 컴포넌트는 제어 컴포넌트로 설계됨
   - 항상 외부에서 상태 관리 필요

## 베스트 프랙티스

1. 항상 오류 처리 구현
```tsx
const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'dismissed') {
        // 사용자가 선택을 취소한 경우
        return;
    }
    if (date) {
        setSelectedDate(date);
    }
};
```

2. 적절한 날짜 범위 설정
```tsx
const today = new Date();
const nextYear = new Date();
nextYear.setFullYear(today.getFullYear() + 1);

<DatePicker
    value={date}
    onChange={handleDateChange}
    minimumDate={today}
    maximumDate={nextYear}
/>
```