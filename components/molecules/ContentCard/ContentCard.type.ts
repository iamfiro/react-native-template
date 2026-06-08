import { ReactNode } from 'react';
import { ImageSourcePropType, ViewStyle } from 'react-native';
import { ColorToken } from '@/types/color';
import { ComponentPropsForTest, WithChildren } from '@/types/components';
import { TypoWeight } from '@/components/atoms/Typo/Typo.type';

export enum ContentCardVariant {
    ELEVATED = 'elevated',
    FLAT = 'flat',
}

export enum ContentCardBadgePosition {
    TOP_LEFT = 'top-left',
    TOP_RIGHT = 'top-right',
    BOTTOM_LEFT = 'bottom-left',
    BOTTOM_RIGHT = 'bottom-right',
}

export enum ContentCardBadgeTone {
    DARK = 'dark',
    LIGHT = 'light',
    BRAND = 'brand',
    DISCOUNT = 'discount',
}

export interface ContentCardProps extends ComponentPropsForTest {
    children: ReactNode;
    variant?: ContentCardVariant;
    onPress?: () => void;
    disabled?: boolean;
    style?: ViewStyle;
}

export interface ContentCardImageProps extends ComponentPropsForTest {
    source: string | ImageSourcePropType;
    aspectRatio?: number;
    borderRadius?: number;
    children?: ReactNode;
    style?: ViewStyle;
    onLoadEnd?: () => void;
}

export interface ContentCardTitleProps extends WithChildren, ComponentPropsForTest {
    size?: number;
    weight?: TypoWeight;
    numberOfLines?: number;
    color?: ColorToken;
}

export interface ContentCardDescriptionProps extends WithChildren, ComponentPropsForTest {
    size?: number;
    weight?: TypoWeight;
    numberOfLines?: number;
    color?: ColorToken;
}

export interface ContentCardPriceProps extends ComponentPropsForTest {
    finalPrice: number | string;
    originalPrice?: number | string;
    discountPercent?: number;
    locale?: string;
    currencySuffix?: string;
    size?: number;
}

export interface ContentCardBadgeProps extends WithChildren, ComponentPropsForTest {
    position?: ContentCardBadgePosition;
    tone?: ContentCardBadgeTone;
    bgColor?: ColorToken;
    textColor?: ColorToken;
}

export interface ContentCardSkeletonProps extends ComponentPropsForTest {
    variant?: ContentCardVariant;
    aspectRatio?: number;
    showDescription?: boolean;
    showPrice?: boolean;
    style?: ViewStyle;
}
