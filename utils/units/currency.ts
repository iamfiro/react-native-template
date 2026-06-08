interface FormatPriceOptions {
    locale?: string;
    currencySuffix?: string;
}

/**
 * Formats a price value into a localized string.
 * - If `value` is a string, returns it as-is (pre-formatted).
 * - If `value` is a number, formats using Intl.NumberFormat with locale and suffix.
 * - NaN / Infinity → '0' + suffix.
 * - Negative numbers preserve the sign.
 */
export function formatPrice(
    value: number | string,
    options?: FormatPriceOptions,
): string {
    if (typeof value === 'string') return value;

    const { locale = 'ko-KR', currencySuffix = '원' } = options ?? {};

    if (!Number.isFinite(value)) {
        return `0${currencySuffix}`;
    }

    const formatted = new Intl.NumberFormat(locale).format(value);
    return `${formatted}${currencySuffix}`;
}

/**
 * Calculates the discount percentage from original to final price.
 * Returns null if original ≤ 0 or final > original.
 * Result is rounded to the nearest integer.
 */
export function calculateDiscountPercent(
    originalPrice: number,
    finalPrice: number,
): number | null {
    if (originalPrice <= 0 || finalPrice > originalPrice) {
        return null;
    }

    return Math.round((1 - finalPrice / originalPrice) * 100);
}
