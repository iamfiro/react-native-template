# SocialLogin 컴포넌트 가이드

## 기본 정보
SocialLogin 컴포넌트는 소셜 미디어 로그인 버튼을 구현한 분자(molecule) 컴포넌트입니다. Google과 Apple 로그인을 지원하며, 각 플랫폼의 디자인 가이드라인을 준수합니다.

## Import 방법
```tsx
import { SocialLogin, SocialLoginBrand } from '@/components/molecules';
```

## Props 명세
```typescript
interface SocialLoginProps {
    brand: SocialLoginBrand;      // 소셜 로그인 종류 (GOOGLE | APPLE)
    border?: boolean;             // 테두리 표시 여부
    onPress: () => void;         // 클릭 이벤트 핸들러
}

enum SocialLoginBrand {
    GOOGLE = "google",
    APPLE = "apple"
}
```

## 스타일 스펙

### 공통 스타일
- 높이: 48px
- 테두리 반경: 12px
- 폰트 크기: 16px
- 폰트 굵기: Medium (500)

### Google 버튼
- 배경색: `#FFFFFF`
- 텍스트 색상: `#000000`
- 테두리: `border ? 1px solid #E0E0E0 : none`
- 아이콘: Google G 로고 (24x24px)

### Apple 버튼
- 배경색: `#000000`
- 텍스트 색상: `#FFFFFF`
- 테두리: 없음
- 아이콘: Apple 로고 (24x24px)

## 사용 예시

### 기본 사용법
```tsx
const LoginScreen = () => {
    const handleGoogleLogin = () => {
        // Google 로그인 처리
    };

    const handleAppleLogin = () => {
        // Apple 로그인 처리
    };

    return (
        <View style={styles.container}>
            <SocialLogin
                brand={SocialLoginBrand.GOOGLE}
                border
                onPress={handleGoogleLogin}
            />
            <SocialLogin
                brand={SocialLoginBrand.APPLE}
                onPress={handleAppleLogin}
            />
        </View>
    );
};
```

## 애니메이션 스펙
- 터치 피드백: scale 0.98
- 애니메이션 duration: 150ms
- 이징: spring(mass: 0.8, stiffness: 400)

## 사용 시 주의사항
1. 플랫폼별 지원 여부 확인
   - iOS: Google, Apple 모두 지원
   - Android: Google만 지원 (Apple 로그인 숨김 처리)

2. 에러 처리
```tsx
const handleSocialLogin = async (brand: SocialLoginBrand) => {
    try {
        // 로그인 처리
    } catch (error) {
        // 에러 처리
        console.error(`${brand} 로그인 실패:`, error);
    }
};
```

## 베스트 프랙티스
1. 플랫폼별 분기 처리
```tsx
const SocialLoginButtons = () => {
    const isIOS = Platform.OS === 'ios';
    
    return (
        <View style={styles.container}>
            <SocialLogin
                brand={SocialLoginBrand.GOOGLE}
                border
                onPress={handleGoogleLogin}
            />
            {isIOS && (
                <SocialLogin
                    brand={SocialLoginBrand.APPLE}
                    onPress={handleAppleLogin}
                />
            )}
        </View>
    );
};
```

3. 브랜드 가이드라인 준수
- Google: [Google Sign-In 브랜딩 가이드라인](https://developers.google.com/identity/branding-guidelines)
- Apple: [Sign in with Apple 인터페이스 가이드라인](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple)