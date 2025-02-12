import { useTheme } from '@/hooks/useTheme';
import { TypoProps, TypoWeight } from './Typo.type';

import { Text, TextStyle } from 'react-native';
import { Color } from '@/constants/color';

export default function Typo(props: TypoProps) {
    const theme = useTheme();
    const {
        children,
        style,
        color,
        textAlign,
        numberOfLines,
        ellipsizeMode,
        size = 16,
        weight = TypoWeight.Medium,
        maxWidth,
        testID,
    } = props;

    const textStyle: TextStyle = {
        width: maxWidth ? '100%' : undefined,
        textAlign,
        fontSize: size,
        fontWeight: weight,
        color: Color[theme][color ?? 'text'],
        ...style,
    };

    return (
        <Text
            style={textStyle}
            numberOfLines={numberOfLines}
            ellipsizeMode={ellipsizeMode}
            testID={testID}
        >
            {children}
        </Text>
    );
}
