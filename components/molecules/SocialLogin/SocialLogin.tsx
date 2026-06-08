import { Typo } from '@/components/atoms/Typo';
import { Row } from '@/components/atoms/Row';
import { StyleSheet } from 'react-native';
import { getSocialBrandDetail } from './SocialLogin.util';
import { SocialLoginProps } from './SocialLogin.type';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';

export default function SocialLogin({brand, onPress, border}: SocialLoginProps) {
    const theme = useTheme();
    const info = getSocialBrandDetail(brand);
    return (
        <Row
            as="hoverable"
            style={{
                backgroundColor: info.backgroundColor,
                
                borderColor: Color[theme].outlineVariant,
                borderWidth: border ? 1 : 0,

                ...s.container,
            }}
            onPress={onPress}
        >
            {info.icon}
            <Typo color={info.textColor} weight={500}>{info.name}로 로그인 하기</Typo>
        </Row>
    );
}

const s = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,

        height: 58,
        width: '100%',

        borderRadius: 999,
    },
});
