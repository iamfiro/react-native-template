import { Typo } from '@/components/atoms/Typo';
import { VStack } from '@/components/atoms/VStack';
import { StyleSheet } from 'react-native';
import { getSocialBrandDetail } from './SocialLogin.util';
import { SocialLoginProps } from './SocialLogin.type';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';

export default function SocialLogin({brand, onPress, border}: SocialLoginProps) {
    const theme = useTheme();
    const info = getSocialBrandDetail(brand);
    return (
        <VStack
            as="hoverable"
            style={{
                backgroundColor: info.backgroundColor,
                
                borderColor: Color[theme].border,
                borderWidth: border ? 1 : 0,

                ...s.container,
            }}
            onPress={onPress}
        >
            {info.icon}
            <Typo color={info.textColor} weight={400}>{info.name}로 로그인 하기</Typo>
        </VStack>
    );
}

const s = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,

        height: 58,
        width: '100%',

        borderRadius: 16,
    },
});
