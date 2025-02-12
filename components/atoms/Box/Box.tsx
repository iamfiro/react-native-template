import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { BoxProps } from './Box.type';

export default function Box({
    bgColor,
    direction = 'column',
    justify = 'flex-start',
    align = 'stretch',
    wrap = 'nowrap',
    gap,
    fullHeight,
    fullWidth,
    as,
    style,
    ...restProps
}: BoxProps) {
    const baseStyle: ViewStyle = {
        backgroundColor: bgColor,
        // Flex를 기본 스타일로 지정
        display: 'flex',
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap,
        gap,

        // fullWidth, fullHeight가 true일 경우 100%로 지정
        width: fullWidth ? '100%' : undefined,
        height: fullHeight ? '100%' : undefined,
    };

    const Component = as === 'hoverable' ? TouchableOpacity : View;

    return <Component style={[baseStyle, style]} {...restProps} />;
}
