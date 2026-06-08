import { StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { CardProps, CardSectionProps } from './Card.type';
import { Box } from '@/components/atoms/Box';
import { Divider } from '@/components/atoms/Divider';

export default function Card({ children, style, onPress, variant = 'default' }: CardProps) {
    const theme = useTheme();
    const colors = Color[theme];

    const variantStyle = {
        default: {
            backgroundColor: colors.surface,
            borderColor: colors.outlineVariant,
            borderWidth: 1,
        },
        white: {
            backgroundColor: colors.surface,
            borderWidth: 0,
        },
        sub: {
            backgroundColor: colors.surfaceContainer,
            borderWidth: 0,
        },
    }[variant];

    return (
        <Box
            as={onPress ? 'hoverable' : 'view'}
            onPress={onPress}
            style={[s.card, variantStyle, style]}
        >
            {children}
        </Box>
    );
}

function CardHeader({ children, style }: CardSectionProps) {
    return (
        <Box style={[s.section, style]}>
            {children}
        </Box>
    );
}

function CardBody({ children, style }: CardSectionProps) {
    return (
        <Box style={[s.section, style]}>
            {children}
        </Box>
    );
}

function CardFooter({ children, style }: CardSectionProps) {
    const theme = useTheme();
    return (
        <>
            <Divider color={Color[theme].outlineVariant} />
            <Box style={[s.section, style]}>
                {children}
            </Box>
        </>
    );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

const s = StyleSheet.create({
    card: {
        borderRadius: 16,
        borderWidth: 1,
        overflow: 'hidden',
    },
    section: {
        padding: 16,
    },
});
