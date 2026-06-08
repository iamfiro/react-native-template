import { SettingsScreen } from '@/components/organisms';
import { NavBar } from '@/components/molecules';
import { Divider } from '@/components/atoms/Divider';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Bell, Home, Lock, Settings, Shield, Smartphone, User } from 'lucide-react-native';
import { Typo } from '@/components/atoms/Typo';

export default function SettingsTab() {
    const theme = useTheme();
    const c = Color[theme];

    return (
        <View style={[s.container, { backgroundColor: c.surface }]}>
            <SafeAreaView style={s.safeArea}>
                <View style={s.header}>
                    <Typo size={26} weight={700} color="onSurface">
                        설정
                    </Typo>
                </View>

                <SettingsScreen
                    sections={[
                        {
                            title: '계정',
                            items: [
                                {
                                    id: 'profile-edit',
                                    label: '프로필 편집',
                                    leadingIcon: <User size={22} color={c.onSurface} />,
                                    onPress: () => {},
                                },
                                {
                                    id: 'notifications',
                                    label: '알림 설정',
                                    leadingIcon: <Bell size={22} color={c.onSurface} />,
                                    onPress: () => {},
                                },
                                {
                                    id: 'device',
                                    label: '기기 관리',
                                    leadingIcon: <Smartphone size={22} color={c.onSurface} />,
                                    onPress: () => {},
                                },
                            ],
                        },
                        {
                            title: '보안',
                            items: [
                                {
                                    id: 'privacy',
                                    label: '개인정보 보호',
                                    leadingIcon: <Shield size={22} color={c.onSurface} />,
                                    onPress: () => {},
                                },
                                {
                                    id: 'lock',
                                    label: '잠금 설정',
                                    leadingIcon: <Lock size={22} color={c.onSurface} />,
                                    onPress: () => {},
                                },
                            ],
                        },
                        {
                            title: '앱 정보',
                            style: { paddingTop: 60 },
                            footer: '현재 최신 버전을 사용하고 있습니다.',
                            items: [
                                {
                                    id: 'version',
                                    label: '앱 버전',
                                    leadingIcon: <Settings size={22} color={c.onSurface} />,
                                    trailingText: '1.0.0',
                                },
                                {
                                    type: 'custom' as const,
                                    id: 'logout-divider',
                                    render: <Divider />,
                                },
                                {
                                    id: 'logout',
                                    label: '로그아웃',
                                    destructive: true,
                                    onPress: () => {},
                                },
                            ],
                        },
                    ]}
                />
            </SafeAreaView>

            <NavBar>
                <NavBar.Item icon={<Home />} selected={false} screenName="/(tabs)">
                    홈
                </NavBar.Item>
                <NavBar.Item icon={<User />} selected={false} screenName="/(tabs)/profile">
                    프로필
                </NavBar.Item>
                <NavBar.Item icon={<Settings />} selected screenName="/(tabs)/settings">
                    설정
                </NavBar.Item>
            </NavBar>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        paddingBottom: 90,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 4,
    },
});
