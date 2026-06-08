import { WithChildren } from '@/types/components';
import { ViewStyle } from 'react-native';

export type CardVariant = 'default' | 'white' | 'sub';

export interface CardProps extends WithChildren {
    style?: ViewStyle;
    onPress?: () => void;
    variant?: CardVariant;
}

export interface CardSectionProps extends WithChildren {
    style?: ViewStyle;
}
