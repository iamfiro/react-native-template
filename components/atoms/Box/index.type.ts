import { VariantColorType } from "@/types/color";
import { TouchableOpacityProps, ViewProps } from "react-native";

export type BoxViewProps = {
    as?: 'view';
} & ViewProps;

export type BoxTouchableProps = {
    as: 'hoverable';
} & TouchableOpacityProps;

interface BoxFlexProps {
    direction?: 'row' | 'column';
    justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
    align?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
    wrap?: 'wrap' | 'nowrap';
}

interface BoxStyleProps {
    bgColor?: VariantColorType;
}

export type BoxProps = BoxStyleProps & BoxFlexProps & (BoxViewProps | BoxTouchableProps);