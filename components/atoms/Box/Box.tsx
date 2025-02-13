import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { BoxProps } from './Box.type';
import { Color } from '@/constants/color';
import { useTheme } from '@/hooks/useTheme';

export default function Box({
    bgColor,
    direction = 'column',
    justify = 'flex-start',
    align = 'stretch',
    wrap = 'nowrap',
    gap,
    fullHeight,
    fullWidth,
    reverse, // Added this line
    as,
    style,
    ...restProps
}: BoxProps) {
    const theme = useTheme();

    const baseStyle: ViewStyle = {
        backgroundColor: Color[theme][bgColor ?? 'surface'],
        display: 'flex',
        flexDirection: `${direction}${reverse ? '-reverse' : ''}`, // direction now includes -reverse variants
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap,
        gap,
        width: fullWidth ? '100%' : undefined,
        height: fullHeight ? '100%' : undefined,
    };

    const Component = as === 'hoverable' ? TouchableOpacity : View;

    return <Component style={[baseStyle, style]} {...restProps} />;
}
