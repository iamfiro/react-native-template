import { VariantColorType } from '@/types/color';
import { ComponentPropsFull } from '@/types/components';
import { TouchableOpacityProps, ViewProps } from 'react-native';

export type BoxViewProps = {
    as?: 'view';
} & ViewProps;

export type BoxTouchableProps = {
    as: 'hoverable';
} & TouchableOpacityProps;

interface BoxFlexProps {
    direction?: 'row' | 'column';
    justify?:
        | 'center'
        | 'flex-start'
        | 'flex-end'
        | 'space-between'
        | 'space-around';
    align?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
    wrap?: 'wrap' | 'nowrap';
    gap?: number;
    reverse?: boolean; // Added this line
}

interface BoxStyleProps
    extends Pick<ComponentPropsFull, 'fullWidth' | 'fullHeight'> {
    bgColor?: VariantColorType;
}

export type BoxProps = BoxStyleProps &
    BoxFlexProps &
    (BoxViewProps | BoxTouchableProps);
