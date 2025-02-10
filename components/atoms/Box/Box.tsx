import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { BoxProps } from './index.type';

export default function Box({
    bgColor,
    direction = 'column',
    justify = 'flex-start',
    align = 'stretch',
    wrap = 'nowrap',
    fullHeight, fullWidth,
    as,
    ...restProps
}: BoxProps) {
    const style: ViewStyle = {
        backgroundColor: bgColor,
        // Flex를 기본 스타일로 지정
        display: 'flex',
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap,

        // fullWidth, fullHeight가 true일 경우 100%로 지정
        width: fullWidth ? '100%' : undefined,
        height: fullHeight ? '100%' : undefined,
    };

    const Component = as === 'hoverable' ? TouchableOpacity : View;

    return <Component style={style} {...restProps} />;
}
