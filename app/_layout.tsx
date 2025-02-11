import { useTheme } from '@/hooks/useTheme';
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

// asset이 로딩되기 전 splash screen이 닫히지 않도록 설정
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const theme = useTheme();
    const [loaded, error] = useFonts({
        PretendardMedium: require('../assets/fonts/Pretendard-Medium.otf'),
        PretendardSemibold: require('../assets/fonts/Pretendard-SemiBold.otf'),
        PretendardBold: require('../assets/fonts/Pretendard-Bold.otf'),
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
