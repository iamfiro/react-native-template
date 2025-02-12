import { DimensionValue, ViewStyle } from 'react-native';

export interface SkeletonProps {
    width?: DimensionValue;
    height?: number;
    borderRadius?: number;
    style?: ViewStyle;
    fullWidth?: boolean;
    fullHeight?: boolean;
    fullRadius?: boolean;
}