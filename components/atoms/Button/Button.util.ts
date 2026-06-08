import { TextStyle, ViewStyle } from 'react-native';
import { ButtonSize, ButtonVariant } from './Button.type';
import { Color } from '@/constants/color';
import { ThemeColorType, ColorToken } from '@/types/color';

export function getButtonColorByVariant(
    variant: ButtonVariant,
    theme: ThemeColorType,
): ViewStyle & TextStyle {
    switch (variant) {
        case ButtonVariant.BRAND:
            return {
                backgroundColor: Color[theme].primary,
                color: 'onPrimary',
            };
        case ButtonVariant.SECONDARY:
            return {
                backgroundColor: Color[theme].secondaryContainer,
                color: 'onSurfaceVariant',
            };
        case ButtonVariant.DANGER:
            return {
                backgroundColor: Color[theme].error,
                color: 'onError',
            };
        case ButtonVariant.SUCCESS:
            return {
                backgroundColor: Color[theme].success,
                color: 'onSuccess',
            };
        case ButtonVariant.WARNING:
            return {
                backgroundColor: Color[theme].warning,
                color: 'onWarning',
            };
        case ButtonVariant.TEXT:
            return {
                backgroundColor: 'transparent',
                color: 'onSurface',
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
                height: 50,
                borderRadius: 999,
                fontSize: 17,
                paddingHorizontal: 20,
            };
        case ButtonSize.MEDIUM:
            return {
                height: 42,
                borderRadius: 12,
                fontSize: 15,
                paddingHorizontal: 16,
            };
        case ButtonSize.SMALL:
            return {
                height: 34,
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
