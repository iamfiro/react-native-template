import { ThemeColorType, VariantColorType } from "@/types/color";
import { BadgeVariant } from "./Badge.type";
import { Color } from "@/constants/color";

export const getBadgeBackgroundColor = (variant: BadgeVariant, theme: ThemeColorType): string => {
    const colorKey = `surface${variant}` as VariantColorType;
    return Color[theme][colorKey];
};

export const getBadgeTextColor = (variant: BadgeVariant): VariantColorType => {
    return `text${variant}` as VariantColorType;
}