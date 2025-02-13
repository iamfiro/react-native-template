import {
    TouchableOpacity,
    StyleSheet,
    TextProps,
    Animated,
    Text,
    ActivityIndicator,
} from 'react-native';
import { ButtonProps, ButtonSize, ButtonVariant } from './Button.type';
import {
    getButtonColorByVariant,
    getButtonStyleByVariant,
} from './Button.util';
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useButtonAnimation } from '@/hooks/components';
import { Color } from '@/constants/color';
import { VariantColorType } from '@/types/color';
import { Typo } from '../Typo';

export default function Button({
    children,
    variant = ButtonVariant.BRAND,
    size = ButtonSize.LARGE,
    isPending,
    disabled,
    fullWidth,
    fullRadius,
    onPress,
}: ButtonProps) {
    const theme = useTheme();
    const { scaleAnim, handlePressIn, handlePressOut } = useButtonAnimation();

    const ButtonStyle = {
        color: getButtonColorByVariant(variant, theme),
        size: getButtonStyleByVariant(size),
    };

    const renderChildren = () => {
        if (React.isValidElement(children) && (children.type === Typo || children.type === Text)) {
            console.log('asd', ButtonStyle.color.color);
            return React.cloneElement(children, {
                style: {
                    ...children.props.style,
                    fontSize: ButtonStyle.size.fontSize,
                },
                color: ButtonStyle.color.color,
            } as TextProps);
        }
        return children;
    };

    const handlePress = () => {
        if (!isPending && !disabled && onPress) {
            onPress();
        }
    };

    return (
        <Animated.View
            style={[
                { transform: [{ scale: scaleAnim }] },
                fullWidth && s.fullWidth,
            ]}
        >
            <TouchableOpacity
                style={[
                    ButtonStyle.color,
                    ButtonStyle.size,
                    s.button,
                    fullWidth && s.fullWidth,
                    fullRadius && s.fullRadius,
                    { opacity: disabled ? 0.5 : 1 },
                ]}
                disabled={isPending || disabled}
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.6}
            >
                {isPending ? (
                    <ActivityIndicator
                        size={24}
                        color={
                            variant === ButtonVariant.SECONDARY ||
                            variant === ButtonVariant.SUCCESS
                                ? Color[theme].white
                                : Color[theme].black
                        }
                    />
                ) : (
                    renderChildren()
                )}
            </TouchableOpacity>
        </Animated.View>
    );
}

const s = StyleSheet.create({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullWidth: {
        width: '100%',
    },
    fullRadius: {
        borderRadius: 999,
    },
});
