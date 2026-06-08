import { ProfileScreen } from '@/components/organisms';
import { Asterisk, Settings, User } from 'lucide-react-native';
import { NavBar } from '@/components/molecules';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import ProfileImage from '@/assets/images/dummy/profile.jpg';

export default function ProfileTab() {
    const theme = useTheme();

    return (
        <View style={[s.container, { backgroundColor: Color[theme].surface }]}>
            <SafeAreaView style={s.safeArea}>
                <ProfileScreen
                    name="홍길동"
                    bio="React Native 개발자 · 커피와 코드를 사랑합니다"
                    avatarSrc={ProfileImage}
                    stats={[
                        { label: '게시물', value: 42 },
                        { label: '팔로워', value: '1.2K' },
                        { label: '팔로잉', value: 180 },
                    ]}
                    menuSections={[
                        {
                            title: '계정',
                            items: [
                                {
                                    id: 'profile-edit',
                                    label: '프로필 편집',
                                    description: '이름, 사진, 소개 수정',
                                    leadingIcon: (
                                        <User
                                            size={18}
                                            color={Color[theme].onSurfaceVariant}
                                        />
                                    ),
                                    onPress: () => {},
                                },
                                {
                                    id: 'notifications',
                                    label: '알림 설정',
                                    description: '푸시 알림 관리',
                                    onPress: () => {},
                                },
                            ],
                        },
                        {
                            title: '앱',
                            items: [
                                {
                                    id: 'help',
                                    label: '도움말',
                                    onPress: () => {},
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
                    onEditProfile={() => {}}
                    onShare={() => {}}
                />
            </SafeAreaView>

            <NavBar>
                <NavBar.Item icon={<Asterisk />} selected={false} screenName="/(tabs)">
                    홈
                </NavBar.Item>
                <NavBar.Item icon={<User />} selected screenName="/(tabs)/profile">
                    프로필
                </NavBar.Item>
                <NavBar.Item icon={<Settings />} selected={false} screenName="/(tabs)/settings">
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
});
