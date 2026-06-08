import { ThemeColorType, ColorToken } from "@/types/color";
import { BadgeVariant } from "./Badge.type";
import { Color } from "@/constants/color";

const BADGE_BG_MAP: Record<BadgeVariant, ColorToken> = {
    [BadgeVariant.BRAND]: 'primaryContainer',
    [BadgeVariant.SUCCESS]: 'successContainer',
    [BadgeVariant.WARNING]: 'warningContainer',
    [BadgeVariant.DANGER]: 'errorContainer',
};

const BADGE_TEXT_MAP: Record<BadgeVariant, ColorToken> = {
    [BadgeVariant.BRAND]: 'onPrimaryContainer',
    [BadgeVariant.SUCCESS]: 'onSuccessContainer',
    [BadgeVariant.WARNING]: 'onWarningContainer',
    [BadgeVariant.DANGER]: 'onErrorContainer',
};

export const getBadgeBackgroundColor = (variant: BadgeVariant, theme: ThemeColorType): string => {
    return Color[theme][BADGE_BG_MAP[variant]];
};

export const getBadgeTextColor = (variant: BadgeVariant): ColorToken => {
    return BADGE_TEXT_MAP[variant];
};
