import { ComponentPropsFull } from '@/types/components';
import { DimensionValue, ViewStyle } from 'react-native';

export interface SkeletonProps extends ComponentPropsFull {
    width?: DimensionValue;
    height?: number;

    borderRadius?: number;

    style?: ViewStyle;
}