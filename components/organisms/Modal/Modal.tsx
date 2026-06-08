import { useEffect, useRef } from 'react';
import {
    Animated,
    Modal as RNModal,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { ModalProps } from './Modal.type';
import { Typo } from '@/components/atoms/Typo';
import { Icon } from '@/components/atoms/Icon';
import { Button, ButtonVariant, ButtonSize } from '@/components/atoms/Button';
import { Row } from '@/components/atoms/Row';

const VARIANT_MAP: Record<string, ButtonVariant> = {
    brand: ButtonVariant.BRAND,
    danger: ButtonVariant.DANGER,
    secondary: ButtonVariant.SECONDARY,
};

export default function Modal({
    visible,
    onClose,
    title,
    children,
    primaryAction,
    secondaryAction,
    closeOnBackdrop = true,
}: ModalProps) {
    const theme = useTheme();
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, bounciness: 6 }),
                Animated.timing(opacityAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(scaleAnim, { toValue: 0.9, duration: 150, useNativeDriver: true }),
                Animated.timing(opacityAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
            ]).start();
        }
    }, [visible]);

    return (
        <RNModal visible={visible} transparent animationType="none" onRequestClose={onClose}>
            <Animated.View style={[s.backdrop, { opacity: opacityAnim }]}>
                {closeOnBackdrop && (
                    <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} activeOpacity={1} />
                )}
            </Animated.View>

            <View style={s.wrapper} pointerEvents="box-none">
                <Animated.View
                    style={[
                        s.container,
                        {
                            backgroundColor: Color[theme].surface,
                            borderColor: Color[theme].outlineVariant,
                            transform: [{ scale: scaleAnim }],
                            opacity: opacityAnim,
                        },
                    ]}
                >
                    {title && (
                        <View style={s.header}>
                            <Typo size={17} weight={600} color="onSurface">
                                {title}
                            </Typo>
                            <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                                <Icon name="close" size={22} color={Color[theme].onSurfaceVariant} />
                            </TouchableOpacity>
                        </View>
                    )}

                    {children && (
                        <View style={s.body}>
                            {children}
                        </View>
                    )}

                    {(primaryAction || secondaryAction) && (
                        <Row gap={8} style={s.footer} fullWidth>
                            {secondaryAction && (
                                <Button
                                    variant={VARIANT_MAP[secondaryAction.variant ?? 'secondary']}
                                    size={ButtonSize.MEDIUM}
                                    onPress={secondaryAction.onPress}
                                    fullWidth
                                >
                                    {secondaryAction.label}
                                </Button>
                            )}
                            {primaryAction && (
                                <Button
                                    variant={VARIANT_MAP[primaryAction.variant ?? 'brand']}
                                    size={ButtonSize.MEDIUM}
                                    onPress={primaryAction.onPress}
                                    fullWidth
                                >
                                    {primaryAction.label}
                                </Button>
                            )}
                        </Row>
                    )}
                </Animated.View>
            </View>
        </RNModal>
    );
}

const s = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    container: {
        width: '100%',
        borderRadius: 20,
        borderWidth: 1,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 12,
    },
    body: {
        paddingHorizontal: 20,
        paddingBottom: 16,
    },
    footer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
});
