import { TouchableOpacity, StyleSheet, Text, TextProps, Animated } from 'react-native';
import { ButtonProps, ButtonSize, ButtonVariant } from './index.type';
import { getButtonColorByVariant, getButtonStyleByVariant } from './index.util';
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useButtonAnimation } from '@/hooks/components';

export default function Button({
    children,
    variant = ButtonVariant.PRIMARY,
    size = ButtonSize.LARGE,
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

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                style={{
                    ...ButtonStyle.color,
                    ...ButtonStyle.size,
                    ...buttonStyle.button,
                }}
                activeOpacity={0.6}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                {renderChildren()}
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
