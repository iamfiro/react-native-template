import { TextStyle, ViewStyle } from 'react-native';
import { ButtonSize, ButtonVariant } from './Button.type';
import { Color } from '@/constants/color';
import { ThemeColorType, VariantColorType } from '@/types/color';

export function getButtonColorByVariant(
    variant: ButtonVariant,
    theme: ThemeColorType,
): ViewStyle & TextStyle {
    console.log(Color[theme], 'ss');
    switch (variant) {
        case ButtonVariant.PRIMARY:
            return {
                backgroundColor: Color[theme].primary,
                color: Color[theme].white,
            };
        case ButtonVariant.SECONDARY:
            return {
                backgroundColor: Color[theme].surfaceSecondary,
                color: Color[theme].text,
            };
        case ButtonVariant.DANGER:
            return {
                backgroundColor: Color[theme].danger,
                color: Color[theme].white,
            };
        case ButtonVariant.SUCCESS:
            return {
                backgroundColor: Color[theme].success,
                color: Color[theme].white,
            };
        case ButtonVariant.WARNING:
            return {
                backgroundColor: Color[theme].warning,
                color: Color[theme].black,
            };
        case ButtonVariant.TEXT:
            return {
                backgroundColor: 'transparent',
                padding: 10,
                borderRadius: 5,
            };
        default:
            return {
                backgroundColor: 'blue',
                padding: 10,
                borderRadius: 5,
            };
    }
}

export function getButtonStyleByVariant(
    size: ButtonSize,
): ViewStyle & TextStyle {
    switch (size) {
        case ButtonSize.LARGE:
            return {
                height: 56,
                borderRadius: 14,
                fontSize: 15,
                paddingHorizontal: 20,
            };
        case ButtonSize.SMALL:
            return {
                height: 38,
                borderRadius: 8,
                fontSize: 12,
                paddingHorizontal: 12,
            };
        default:
            return {
                height: 30,
            };
    }
}
