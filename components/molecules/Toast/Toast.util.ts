import { Color } from '@/constants/color';
import { ToastVariant } from './Toast.type';
import { ThemeColorType } from '@/types/color';
import { GlyphIconName } from '@/components/atoms/Icon';

export function getToastColors(variant: ToastVariant, theme: ThemeColorType) {
    switch (variant) {
        case ToastVariant.SUCCESS:
            return { bg: Color[theme].surfaceSuccess, border: Color[theme].borderSuccess, text: Color[theme].textSuccess };
        case ToastVariant.ERROR:
            return { bg: Color[theme].surfaceError, border: Color[theme].borderError, text: Color[theme].textError };
        case ToastVariant.WARNING:
            return { bg: Color[theme].surfaceWarning, border: Color[theme].borderWarning, text: Color[theme].textWarning };
        case ToastVariant.INFO:
        default:
            return { bg: Color[theme].surfaceBrand, border: Color[theme].borderBrand, text: Color[theme].textBrand };
    }
}

export function getToastIcon(variant: ToastVariant): GlyphIconName {
    switch (variant) {
        case ToastVariant.SUCCESS: return 'check';
        case ToastVariant.ERROR: return 'error';
        case ToastVariant.WARNING: return 'warning';
        case ToastVariant.INFO: default: return 'info';
    }
}
