import { Color } from '@/constants/color';
import { ToastVariant } from './Toast.type';
import { ThemeColorType } from '@/types/color';
import { GlyphIconName } from '@/components/atoms/Icon';

export function getToastColors(variant: ToastVariant, theme: ThemeColorType) {
    switch (variant) {
        case ToastVariant.SUCCESS:
            return { bg: Color[theme].successContainer, border: Color[theme].success, text: Color[theme].success };
        case ToastVariant.ERROR:
            return { bg: Color[theme].errorContainer, border: Color[theme].error, text: Color[theme].error };
        case ToastVariant.WARNING:
            return { bg: Color[theme].warningContainer, border: Color[theme].warning, text: Color[theme].warning };
        case ToastVariant.INFO:
        default:
            return { bg: Color[theme].primaryContainer, border: Color[theme].primary, text: Color[theme].primary };
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
