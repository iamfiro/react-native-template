import { View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { DividerProps } from './Divider.type';

export default function Divider({
    direction = 'horizontal',
    thickness = 1,
    color,
    style,
}: DividerProps) {
    const theme = useTheme();

    const isHorizontal = direction === 'horizontal';

    return (
        <View
            style={[
                {
                    backgroundColor: color ?? Color[theme].border,
                    width: isHorizontal ? '100%' : thickness,
                    height: isHorizontal ? thickness : '100%',
                },
                style,
            ]}
        />
    );
}
