import { ActivityIndicator } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { SpinnerProps } from './Spinner.type';

export default function Spinner({ size = 'small', color }: SpinnerProps) {
    const theme = useTheme();

    return (
        <ActivityIndicator
            size={size}
            color={color ?? Color[theme].primary}
        />
    );
}
