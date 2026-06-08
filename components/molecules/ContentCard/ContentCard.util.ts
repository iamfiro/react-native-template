import { ViewStyle } from 'react-native';
import { Color } from '@/constants/color';
import { ColorToken, ThemeColorType } from '@/types/color';
import {
    ContentCardVariant,
    ContentCardBadgePosition,
    ContentCardBadgeTone,
} from './ContentCard.type';

export const CONTAINER_STYLE: Record<ContentCardVariant, (theme: ThemeColorType) => ViewStyle> = {
    [ContentCardVariant.ELEVATED]: (theme) => ({
        backgroundColor: Color[theme].surface,
        borderRadius: 16,
        padding: 12,
        gap: 12,
        shadowColor: Color[theme].shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: theme === 'light' ? 0.06 : 0.3,
        shadowRadius: 8,
        elevation: 2,
    }),
    [ContentCardVariant.FLAT]: () => ({
        backgroundColor: 'transparent',
        gap: 8,
    }),
};

export const BADGE_POSITION_STYLE: Record<ContentCardBadgePosition, ViewStyle> = {
    [ContentCardBadgePosition.TOP_LEFT]: { top: 8, left: 8 },
    [ContentCardBadgePosition.TOP_RIGHT]: { top: 8, right: 8 },
    [ContentCardBadgePosition.BOTTOM_LEFT]: { bottom: 8, left: 8 },
    [ContentCardBadgePosition.BOTTOM_RIGHT]: { bottom: 8, right: 8 },
};

export const BADGE_TONE_MAP: Record<ContentCardBadgeTone, { bg: ColorToken; fg: ColorToken }> = {
    [ContentCardBadgeTone.DARK]: { bg: 'inverseSurface', fg: 'inverseOnSurface' },
    [ContentCardBadgeTone.LIGHT]: { bg: 'surface', fg: 'onSurface' },
    [ContentCardBadgeTone.BRAND]: { bg: 'primary', fg: 'onPrimary' },
    [ContentCardBadgeTone.DISCOUNT]: { bg: 'errorContainer', fg: 'onErrorContainer' },
};

export function getDefaultAspectRatio(variant: ContentCardVariant): number {
    return variant === ContentCardVariant.ELEVATED ? 3 / 2 : 1;
}
