import { Column, Pressable, Row, Typo, TypoWeight } from '@/components/atoms';
import { Form, type FormField, type FormValues } from '@/components/organisms';
import { Color } from '@/constants/color';
import { useTheme } from '@/hooks/useTheme';
import { router } from 'expo-router';
import { useRef } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
    const theme = useTheme();
    const c = Color[theme];
    const passwordForValidation = useRef('');

    const registerFields: FormField[] = [
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
            placeholder: '6자 이상 입력해주세요',
            required: true,
            minLength: 6,
            validate: (value) => {
                passwordForValidation.current = value;
                return undefined;
            },
        },
        {
            name: 'confirmPassword',
            label: '비밀번호 확인',
            type: 'password',
            placeholder: '비밀번호를 다시 입력해주세요',
            required: true,
            minLength: 6,
            validate: (value) =>
                value === passwordForValidation.current
                    ? undefined
                    : '비밀번호가 일치하지 않습니다.',
        },
    ];

    const handleSubmit = (values: FormValues) => {
        console.log('register.tsx', values);
    };

    return (
        <SafeAreaView style={[s.safeArea, { backgroundColor: c.surface }]}>
            <View style={s.container}>
                <Column gap={32} style={s.content}>
                    <Column gap={10} align="center">
                        <Typo size={32} weight={TypoWeight.Bold} color="onSurface">
                            회원가입
                        </Typo>
                        <Typo size={15} color="onSurfaceVariant" textAlign="center">
                            이메일과 비밀번호로 새 계정을 만들어보세요.
                        </Typo>
                    </Column>

                    <Form fields={registerFields} onSubmit={handleSubmit} submitLabel="회원가입" />

                    <Row gap={6} align="center" justify="center">
                        <Typo size={14} color="onSurfaceVariant">
                            이미 계정이 있으신가요?
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
