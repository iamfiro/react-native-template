import { Column, Pressable, Row, Typo, TypoWeight } from '@/components/atoms';
import { Form, type FormField, type FormValues } from '@/components/organisms';
import { Color } from '@/constants/color';
import { useTheme } from '@/hooks/useTheme';
import { router } from 'expo-router';
import { SafeAreaView, StyleSheet, View } from 'react-native';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const forgotPasswordFields: FormField[] = [
    {
        name: 'email',
        label: '이메일',
        type: 'email',
        placeholder: '가입한 이메일을 입력해주세요',
        required: true,
        pattern: EMAIL_PATTERN,
    },
];

export default function ForgotPasswordPage() {
    const theme = useTheme();
    const c = Color[theme];

    const handleSubmit = (values: FormValues) => {
        console.log('forgot-password.tsx', values);
    };

    return (
        <SafeAreaView style={[s.safeArea, { backgroundColor: c.surface }]}>
            <View style={s.container}>
                <Column gap={32} style={s.content}>
                    <Column gap={10} align="center">
                        <Typo size={32} weight={TypoWeight.Bold} color="onSurface">
                            비밀번호 찾기
                        </Typo>
                        <Typo size={15} color="onSurfaceVariant" textAlign="center">
                            가입한 이메일로 비밀번호 재설정 안내를 보내드립니다.
                        </Typo>
                    </Column>

                    <Form
                        fields={forgotPasswordFields}
                        onSubmit={handleSubmit}
                        submitLabel="재설정 메일 보내기"
                    />

                    <Row gap={6} align="center" justify="center">
                        <Typo size={14} color="onSurfaceVariant">
                            로그인 화면으로 돌아가시겠어요?
                        </Typo>
                        <Pressable onPress={() => router.replace('/(auth)/login')}>
                            <Typo size={14} weight={TypoWeight.SemiBold} color="primary">
                                로그인
                            </Typo>
                        </Pressable>
                    </Row>
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
});
