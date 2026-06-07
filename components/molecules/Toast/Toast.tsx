import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { ToastProps, ToastVariant } from './Toast.type';
import { getToastColors, getToastIcon } from './Toast.util';
import { Icon } from '@/components/atoms/Icon';
import { Typo } from '@/components/atoms/Typo';

export default function Toast({
    message,
    variant = ToastVariant.INFO,
    visible,
    duration = 3000,
    onHide,
}: ToastProps) {
    const theme = useTheme();
    const translateY = useRef(new Animated.Value(-80)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    const colors = getToastColors(variant, theme);
    const iconName = getToastIcon(variant);

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.spring(translateY, { toValue: 0, useNativeDriver: true, bounciness: 6 }),
                Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
            ]).start();

            const timer = setTimeout(() => {
                hide();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    const hide = () => {
        Animated.parallel([
            Animated.timing(translateY, { toValue: -80, duration: 200, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        ]).start(() => onHide?.());
    };

    if (!visible) return null;

    return (
        <Animated.View
            style={[
                s.container,
                {
                    backgroundColor: colors.bg,
                    borderColor: colors.border,
                    transform: [{ translateY }],
                    opacity,
                },
            ]}
        >
            <Icon name={iconName} size={18} color={colors.text} />
            <Typo size={14} weight={500} style={{ color: colors.text, flex: 1 }}>
                {message}
            </Typo>
        </Animated.View>
    );
}

const s = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 60,
        left: 16,
        right: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 14,
        borderWidth: 1,
        zIndex: 9999,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
});
