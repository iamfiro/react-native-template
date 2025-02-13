import { ThemeColorType, VariantColorType } from "@/types/color";
import { BadgeVariant } from "./Badge.type";
import { Color } from "@/constants/color";

/**
 * 뱃지의 배경색을 가져옵니다.
 * @param variant - 뱃지의 변형 타입 (예: 'Brand', 'Error', 'Success', 'Warning')
 * @param theme - 현재 테마 ('light' 또는 'dark')
 * @returns HEX 컬러 코드 (예: '#FFFFFF')
 * 
 * @example
 * ```typescript
 * const bgColor = getBadgeBackgroundColor('Brand', 'light'); // '#E8F5FF' 반환
 * ```
 */
export const getBadgeBackgroundColor = (variant: BadgeVariant, theme: ThemeColorType): string => {
    const colorKey = `surface${variant}` as VariantColorType;
    return Color[theme][colorKey];
};

/**
 * 뱃지의 텍스트 색상을 가져옵니다.
 * @param variant - 뱃지의 변형 타입
 * @returns 텍스트 색상을 나타내는 VariantColorType
 * 
 * @example
 * ```typescript
 * const textColor = getBadgeTextColor('primary'); // returns 'textPrimary'
 * ```
 */
export const getBadgeTextColor = (variant: BadgeVariant): VariantColorType => {
    return `text${variant}` as VariantColorType;
}