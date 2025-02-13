# NavBar 컴포넌트 사용 가이드

## Import 방법
```tsx
import { NavBar } from '@/components/molecules';
import { Home, Profile, Settings } from '@/assets/icons';
```

## 기본 사용법
```tsx
const TabNavigator = () => {
    const currentRoute = usePathname(); // 현재 경로 가져오기

    return (
        <NavBar>
            <NavBar.Item
                icon={<Home />}
                selected={currentRoute === '/'}
                screenName="/"
            >
                홈
            </NavBar.Item>
            <NavBar.Item
                icon={<Profile />}
                selected={currentRoute === '/profile'}
                screenName="/profile"
            >
                프로필
            </NavBar.Item>
            <NavBar.Item
                icon={<Settings />}
                selected={currentRoute === '/settings'}
                screenName="/settings"
            >
                설정
            </NavBar.Item>
        </NavBar>
    );
};
```

## 사용 사례별 예시

### 1. 기본 네비게이션
```tsx
// app/_layout.tsx
export default function RootLayout() {
    return (
        <Tabs
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <NavBar {...props} />}
        >
            <Tabs.Screen name="index" options={{
                title: '홈',
                tabBarIcon: ({ focused }) => <Home active={focused} />
            }} />
            {/* ...다른 탭 스크린들 */}
        </Tabs>
    );
}
```

### 2. 뱃지가 있는 네비게이션
```tsx
<NavBar>
    <NavBar.Item
        icon={<Home />}
        selected={currentRoute === '/'}
        screenName="/"
    >
        홈
    </NavBar.Item>
    <NavBar.Item
        icon={
            <View>
                <Message />
                <Badge>2</Badge>
            </View>
        }
        selected={currentRoute === '/messages'}
        screenName="/messages"
    >
        메시지
    </NavBar.Item>
</NavBar>
```

### 3. 동적 아이템 렌더링
```tsx
const navigationItems = [
    { icon: <Home />, label: '홈', path: '/' },
    { icon: <Profile />, label: '프로필', path: '/profile' },
    { icon: <Settings />, label: '설정', path: '/settings' }
];

<NavBar>
    {navigationItems.map(({ icon, label, path }) => (
        <NavBar.Item
            key={path}
            icon={icon}
            selected={currentRoute === path}
            screenName={path}
        >
            {label}
        </NavBar.Item>
    ))}
</NavBar>
```

## Props 설명

### NavBar.Item
```typescript
interface NavBarItemProps extends WithChildren {
    icon?: React.ReactNode;           // 탭 아이콘 (선택)
    selected: boolean;                // 현재 선택 상태
    screenName: RelativePathString;   // 연결된 화면 경로
}
```

## 유의사항
1. 각 `NavBar.Item`은 고유한 `screenName`을 가져야 합니다
2. 아이콘은 선택적이지만, 사용자 경험을 위해 권장됩니다
3. 항목 수는 2-5개 사이를 권장합니다
4. 모든 항목은 동일한 레벨의 네비게이션을 표현해야 합니다
5. 아이콘의 모든 색상은 color props를 통해 강제로 주입됩니다

## 베스트 프랙티스
- 가장 중요하거나 자주 사용되는 화면을 왼쪽에 배치
- 명확하고 직관적인 아이콘 사용
- 짧고 명확한 라벨 텍스트 사용
- 일관된 아이콘 스타일 유지