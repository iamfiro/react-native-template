import { WithChildren, ComponentPropsFull } from '@/types/components';
import { ViewStyle } from 'react-native';

export interface PressableProps extends WithChildren, Pick<ComponentPropsFull, 'fullWidth'> {
    onPress?: () => void;
    onLongPress?: () => void;
    disabled?: boolean;
    style?: ViewStyle;
    haptic?: boolean;
    activeOpacity?: number;
}
