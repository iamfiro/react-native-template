import { TouchableOpacity } from 'react-native';
import { PressableProps } from './Pressable.type';

export default function Pressable({
    children,
    onPress,
    onLongPress,
    disabled,
    style,
    fullWidth,
    activeOpacity = 0.7,
}: PressableProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            disabled={disabled}
            activeOpacity={activeOpacity}
            style={[fullWidth && { width: '100%' }, { opacity: disabled ? 0.5 : 1 }, style]}
        >
            {children}
        </TouchableOpacity>
    );
}
