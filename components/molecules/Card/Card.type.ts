import { WithChildren } from '@/types/components';
import { ViewStyle } from 'react-native';

export interface CardProps extends WithChildren {
    style?: ViewStyle;
    onPress?: () => void;
}

export interface CardSectionProps extends WithChildren {
    style?: ViewStyle;
}
