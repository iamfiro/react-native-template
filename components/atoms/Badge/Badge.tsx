import { StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

import { BadgeProps, BadgeSize, BadgeVariant } from './Badge.type';

import { Box } from '../Box';
import { Typo } from '../Typo';

import { Color } from '@/constants/color';
import { VariantColorType } from '@/types/color';
import { getBadgeBackgroundColor, getBadgeTextColor } from './Badge.util';

export function Badge({
    children,
    variant = BadgeVariant.BRAND,
    size = BadgeSize.MEDIUM,
}: BadgeProps) {
    const theme = useTheme();

    const getPadding = () => {
        switch (size) {
            case BadgeSize.SMALL:
                return { paddingVertical: 2, paddingHorizontal: 6 };
            case BadgeSize.LARGE:
                return { paddingVertical: 6, paddingHorizontal: 12 };
            default:
                return { paddingVertical: 4, paddingHorizontal: 8 };
        }
    };

    const getFontSize = () => {
        switch (size) {
            case BadgeSize.SMALL:
                return 10;
            case BadgeSize.LARGE:
                return 14;
            default:
                return 12;
        }
    };

    return (
        <Box
            style={[
                styles.container,
                {
                    backgroundColor: getBadgeBackgroundColor(variant, theme),
                    ...getPadding(),
                },
            ]}
        >
            <Typo size={getFontSize()} weight={400} color={getBadgeTextColor(variant)}>
                {children}
            </Typo>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        alignSelf: 'flex-start',
    },
});
