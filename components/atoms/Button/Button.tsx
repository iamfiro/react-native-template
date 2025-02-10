import { TouchableOpacity, StyleSheet, Text, TextProps, Animated, ActivityIndicator } from 'react-native';
import { ButtonProps, ButtonSize, ButtonVariant } from './index.type';
import { getButtonColorByVariant, getButtonStyleByVariant } from './index.util';
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useButtonAnimation } from '@/hooks/components';
import { Color } from '@/constants/color';

export default function Button({
    children,
    variant = ButtonVariant.PRIMARY,
    size = ButtonSize.LARGE,
    isPending,
    disabled,
    onPress,
}: ButtonProps) {
    const theme = useTheme();
    const { scaleAnim, handlePressIn, handlePressOut } = useButtonAnimation();

    const ButtonStyle = {
        color: getButtonColorByVariant(variant, theme),
        size: getButtonStyleByVariant(size),
    };

    const renderChildren = () => {
        if (React.isValidElement(children) && children.type === Text) {
            return React.cloneElement(children, {
                style: {
                    ...children.props.style,
                    color: ButtonStyle.color.color,
                    fontSize: ButtonStyle.size.fontSize,
                },
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
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                style={{
                    ...ButtonStyle.color,
                    ...ButtonStyle.size,
                    ...buttonStyle.button,
                    opacity: disabled ? 0.5 : 1,
                }}
                disabled={isPending || disabled}
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                {isPending ? (
                    <ActivityIndicator 
                        size={24} 
                        color={variant === ButtonVariant.SECONDARY || variant === ButtonVariant.SUCCESS
                            ? Color.sementic.white 
                            : Color.sementic.black
                        } 
                    />
                ) : renderChildren()}
            </TouchableOpacity>
        </Animated.View>
    );
}

const buttonStyle = StyleSheet.create({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
