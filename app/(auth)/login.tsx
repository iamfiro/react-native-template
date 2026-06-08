import { Column, Pressable, Row, Typo, TypoWeight } from '@/components/atoms';
import { SocialLogin, SocialLoginBrand } from '@/components/molecules';
import { Form, type FormField, type FormValues } from '@/components/organisms';
import { Color } from '@/constants/color';
import { useTheme } from '@/hooks/useTheme';
import { router } from 'expo-router';
import { SafeAreaView, StyleSheet, View } from 'react-native';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const loginFields: FormField[] = [
    {
        name: 'email',
        label: '이메일',
        type: 'email',
        placeholder: '이메일을 입력해주세요',
        required: true,
        pattern: EMAIL_PATTERN,
    },
    {
        name: 'password',
        label: '비밀번호',
        type: 'password',
        placeholder: '비밀번호를 입력해주세요',
        required: true,
        minLength: 6,
    },
];

export default function LoginPage() {
    const theme = useTheme();
    const c = Color[theme];

    const handleSubmit = (values: FormValues) => {
        console.log('login.tsx', values);
    };

    return (
        <SafeAreaView style={[s.safeArea, { backgroundColor: c.surface }]}>
            <View style={s.container}>
                <Column gap={32} style={s.content}>
                    <Column gap={10} align="center">
                        <Typo size={32} weight={TypoWeight.Bold} color="onSurface">
                            로그인
                        </Typo>
                        <Typo size={15} color="onSurfaceVariant" textAlign="center">
                            계정으로 로그인하고 서비스를 시작하세요.
                        </Typo>
                    </Column>

                    <Form fields={loginFields} onSubmit={handleSubmit} submitLabel="로그인" />

                    <Column gap={18}>
                        <Row gap={12} align="center">
                            <View style={[s.divider, { backgroundColor: c.outlineVariant }]} />
                            <Typo size={13} color="onSurfaceVariant">
                                또는
                            </Typo>
                            <View style={[s.divider, { backgroundColor: c.outlineVariant }]} />
                        </Row>

                        <Column gap={12}>
                            <SocialLogin
                                brand={SocialLoginBrand.GOOGLE}
                                onPress={() => console.log('login.tsx google')}
                                border
                            />
                            <SocialLogin
                                brand={SocialLoginBrand.APPLE}
                                onPress={() => console.log('login.tsx apple')}
                                border
                            />
                        </Column>
                    </Column>

                    <Column gap={14} align="center">
                        <Pressable onPress={() => router.push('/(auth)/forgot-password')}>
                            <Typo size={14} weight={TypoWeight.SemiBold} color="primary">
                                비밀번호를 잊으셨나요?
                            </Typo>
                        </Pressable>

                        <Row gap={6} align="center" justify="center">
                            <Typo size={14} color="onSurfaceVariant">
                                아직 계정이 없으신가요?
                            </Typo>
                            <Pressable onPress={() => router.push('/(auth)/register')}>
                                <Typo size={14} weight={TypoWeight.SemiBold} color="primary">
                                    회원가입
                                </Typo>
                            </Pressable>
                        </Row>
                    </Column>
                </Column>
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    content: {
        width: '100%',
        maxWidth: 420,
        alignSelf: 'center',
    },
    divider: {
        flex: 1,
        height: 1,
    },
});
