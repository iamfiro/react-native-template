import { ImageBackground, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Title from '@/components/molecules/Title/Title';
import { Button } from '@/components/atoms/Button';
import { ButtonVariant } from '@/components/atoms/Button/Button.type';
import SocialLogin from '@/components/molecules/SocialLogin/SocialLogin';
import { SocialLoginBrand } from '@/components/molecules/SocialLogin/SocialLogin.type';
import { Typo } from '@/components/atoms/Typo';
import { Pressable } from '@/components/atoms/Pressable';
import { Column } from '@/components/atoms/Column';
import { OnboardingScreenProps } from './OnboardingScreen.type';

const GRADIENT_COLORS = [
    'transparent',
    'rgba(5, 10, 35, 0.55)',
    'rgba(3, 6, 28, 0.85)',
    'rgba(2, 4, 20, 0.97)',
] as const;

export default function OnboardingScreen({
    backgroundImage,
    title,
    description,
    actions,
}: OnboardingScreenProps) {
    const insets = useSafeAreaInsets();

    return (
        <View style={s.root}>
            <ImageBackground source={backgroundImage} style={StyleSheet.absoluteFill} resizeMode="cover" />
            <LinearGradient
                colors={GRADIENT_COLORS}
                locations={[0, 0.35, 0.65, 1]}
                style={s.gradient}
            />
            <View style={[s.content, { paddingBottom: insets.bottom + 24 }]}>
                <Title title={title} description={description} align="center" />
                <Column gap={12} style={s.actions}>
                    {actions.map((action, index) => {
                        if (action.type === 'button') {
                            return (
                                <Button
                                    key={index}
                                    variant={ButtonVariant.BRAND}
                                    fullWidth
                                    fullRadius
                                    onPress={action.onPress}
                                >
                                    {action.label}
                                </Button>
                            );
                        }
                        if (action.type === 'google') {
                            return (
                                <SocialLogin
                                    key={index}
                                    brand={SocialLoginBrand.GOOGLE}
                                    onPress={action.onPress}
                                />
                            );
                        }
                        if (action.type === 'apple') {
                            return (
                                <SocialLogin
                                    key={index}
                                    brand={SocialLoginBrand.APPLE}
                                    onPress={action.onPress}
                                />
                            );
                        }
                        if (action.type === 'email') {
                            return (
                                <Pressable key={index} onPress={action.onPress} style={s.emailBtn}>
                                    <Typo size={14} color="onSurfaceVariant" textAlign="center">
                                        {action.label ?? '이메일로 로그인'}
                                    </Typo>
                                </Pressable>
                            );
                        }
                        if (action.type === 'custom') {
                            return <View key={index}>{action.node}</View>;
                        }
                        return null;
                    })}
                </Column>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    root: {
        flex: 1,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '65%',
    },
    content: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 24,
        gap: 28,
    },
    actions: {
        width: '100%',
    },
    emailBtn: {
        alignSelf: 'center',
        paddingVertical: 8,
    },
});
