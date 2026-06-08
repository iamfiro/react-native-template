import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { Typo } from '@/components/atoms/Typo';
import { TypoWeight } from '@/components/atoms/Typo/Typo.type';
import { Pressable } from '@/components/atoms/Pressable';
import Skeleton from '@/components/atoms/Skeleton/Skeleton';
import { formatPrice, calculateDiscountPercent } from '@/utils/units/currency';
import {
    ContentCardProps,
    ContentCardImageProps,
    ContentCardTitleProps,
    ContentCardDescriptionProps,
    ContentCardPriceProps,
    ContentCardBadgeProps,
    ContentCardSkeletonProps,
    ContentCardVariant,
    ContentCardBadgePosition,
    ContentCardBadgeTone,
} from './ContentCard.type';
import {
    CONTAINER_STYLE,
    BADGE_POSITION_STYLE,
    BADGE_TONE_MAP,
    getDefaultAspectRatio,
} from './ContentCard.util';

export default function ContentCard({
    children,
    variant = ContentCardVariant.ELEVATED,
    onPress,
    disabled,
    style,
    testID,
}: ContentCardProps) {
    const theme = useTheme();
    const containerStyle = CONTAINER_STYLE[variant](theme);

    const content = (
        <View
            style={[containerStyle, disabled && s.disabled, style]}
            testID={testID}
        >
            {children}
        </View>
    );

    if (onPress) {
        return (
            <Pressable onPress={onPress} disabled={disabled} activeOpacity={0.7}>
                {content}
            </Pressable>
        );
    }

    return content;
}

function ContentCardImage({
    source,
    aspectRatio,
    borderRadius = 12,
    children,
    style,
    onLoadEnd,
    testID,
}: ContentCardImageProps) {
    const theme = useTheme();
    const imageSource: ImageSourcePropType =
        typeof source === 'string' ? { uri: source } : source;

    return (
        <View
            style={[
                s.imageContainer,
                {
                    aspectRatio,
                    borderRadius,
                    backgroundColor: Color[theme].surfaceContainer,
                },
                style,
            ]}
            testID={testID}
        >
            <Image
                source={imageSource}
                style={s.image}
                resizeMode="cover"
                onLoadEnd={onLoadEnd}
            />
            {children}
        </View>
    );
}

function ContentCardTitle({
    children,
    size = 17,
    weight = TypoWeight.Bold,
    numberOfLines = 1,
    color = 'onSurface',
    testID,
}: ContentCardTitleProps) {
    return (
        <Typo
            size={size}
            weight={weight}
            numberOfLines={numberOfLines}
            ellipsizeMode="tail"
            color={color}
            testID={testID}
        >
            {children}
        </Typo>
    );
}

function ContentCardDescription({
    children,
    size = 14,
    weight = TypoWeight.Regular,
    numberOfLines = 1,
    color = 'onSurfaceVariant',
    testID,
}: ContentCardDescriptionProps) {
    return (
        <Typo
            size={size}
            weight={weight}
            numberOfLines={numberOfLines}
            ellipsizeMode="tail"
            color={color}
            testID={testID}
        >
            {children}
        </Typo>
    );
}

function ContentCardPrice({
    finalPrice,
    originalPrice,
    discountPercent,
    locale,
    currencySuffix,
    size = 16,
    testID,
}: ContentCardPriceProps) {
    const formatOptions = { locale, currencySuffix };

    const computedDiscount = discountPercent ??
        (typeof originalPrice === 'number' && typeof finalPrice === 'number'
            ? calculateDiscountPercent(originalPrice, finalPrice)
            : null);

    return (
        <View style={s.priceContainer} testID={testID}>
            {originalPrice !== undefined && (
                <Typo
                    size={size - 3}
                    weight={TypoWeight.Regular}
                    color="onSurfaceVariant"
                    style={s.strikethrough}
                >
                    {formatPrice(originalPrice, formatOptions)}
                </Typo>
            )}
            <View style={s.priceRow}>
                {computedDiscount !== null && computedDiscount > 0 && (
                    <Typo size={size} weight={TypoWeight.Bold} color="error">
                        {computedDiscount}%
                    </Typo>
                )}
                <Typo size={size} weight={TypoWeight.Bold} color="onSurface">
                    {formatPrice(finalPrice, formatOptions)}
                </Typo>
            </View>
        </View>
    );
}

function ContentCardBadge({
    children,
    position = ContentCardBadgePosition.TOP_RIGHT,
    tone = ContentCardBadgeTone.DARK,
    bgColor,
    textColor,
    testID,
}: ContentCardBadgeProps) {
    const theme = useTheme();
    const toneColors = BADGE_TONE_MAP[tone];
    const bg = Color[theme][bgColor ?? toneColors.bg];
    const fg = textColor ?? toneColors.fg;

    return (
        <View
            style={[
                s.badge,
                BADGE_POSITION_STYLE[position],
                { backgroundColor: bg },
            ]}
            testID={testID}
        >
            <Typo size={11} weight={TypoWeight.SemiBold} color={fg}>
                {children}
            </Typo>
        </View>
    );
}

function ContentCardSkeleton({
    variant = ContentCardVariant.ELEVATED,
    aspectRatio,
    showDescription = variant === ContentCardVariant.ELEVATED,
    showPrice = variant === ContentCardVariant.FLAT,
    style,
    testID,
}: ContentCardSkeletonProps) {
    const theme = useTheme();
    const containerStyle = CONTAINER_STYLE[variant](theme);
    const resolvedAspectRatio = aspectRatio ?? getDefaultAspectRatio(variant);

    return (
        <View style={[containerStyle, style]} testID={testID}>
            <Skeleton
                width="100%"
                height={0}
                borderRadius={12}
                style={{ aspectRatio: resolvedAspectRatio }}
            />
            <Skeleton width="70%" height={18} borderRadius={4} />
            {showDescription && (
                <Skeleton width="50%" height={14} borderRadius={4} />
            )}
            {showPrice && (
                <View style={s.skeletonPriceRow}>
                    <Skeleton width="30%" height={16} borderRadius={4} />
                    <Skeleton width="45%" height={16} borderRadius={4} />
                </View>
            )}
        </View>
    );
}

ContentCard.Image = ContentCardImage;
ContentCard.Title = ContentCardTitle;
ContentCard.Description = ContentCardDescription;
ContentCard.Price = ContentCardPrice;
ContentCard.Badge = ContentCardBadge;
ContentCard.Skeleton = ContentCardSkeleton;

const s = StyleSheet.create({
    disabled: {
        opacity: 0.5,
    },
    imageContainer: {
        width: '100%',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    priceContainer: {
        gap: 2,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 6,
    },
    strikethrough: {
        textDecorationLine: 'line-through',
    },
    badge: {
        position: 'absolute',
        borderRadius: 999,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    skeletonPriceRow: {
        flexDirection: 'row',
        gap: 8,
    },
});
