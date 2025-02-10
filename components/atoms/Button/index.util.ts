import { TextStyle, ViewStyle } from 'react-native';
import { ButtonSize, ButtonVariant } from './index.type';
import { Color } from '@/constants/color';
import { ThemeColorType, VariantColorType } from '@/types/color';

export function getButtonColorByVariant(variant: ButtonVariant, theme: ThemeColorType): ViewStyle & TextStyle {
    console.log(Color[theme], 'ss');
    switch (variant) {
        case ButtonVariant.PRIMARY:
            return {
                backgroundColor: Color.sementic.primary,
                color: Color.sementic.white,
            };
        case ButtonVariant.SECONDARY:
            return {
                backgroundColor: Color[theme].surfaceSecondary,
                color: Color[theme].text,
            };
        case ButtonVariant.DANGER:
            return {
                backgroundColor: Color.sementic.danger,
                color: Color.sementic.white,
            };
        case ButtonVariant.SUCCESS:
            return {
                backgroundColor: Color.sementic.success,
                color: Color.sementic.white,
            };
        case ButtonVariant.WARNING:
            return {
                backgroundColor: Color.sementic.warning,
                color: Color.sementic.black,
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

export function getButtonStyleByVariant(size: ButtonSize): ViewStyle & TextStyle {
    switch (size) {
        case ButtonSize.LARGE:
            return {
                height: 56,
                borderRadius: 14,
                fontSize: 15,
            }
        case ButtonSize.SMALL:
            return {
                height: 30,
                borderRadius: 8,
                fontSize: 12,
            }
        default:
            return {
                height: 30,
            }
    }
}