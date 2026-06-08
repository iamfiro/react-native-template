import { useRef, useEffect } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { SwitchProps } from './Switch.type';
import { Typo } from '../Typo';

const TRACK_WIDTH = 50;
const TRACK_HEIGHT = 28;
const THUMB_SIZE = 22;
const THUMB_OFFSET = 3;
const THUMB_TRAVEL = TRACK_WIDTH - THUMB_SIZE - THUMB_OFFSET * 2;

export default function Switch({ value, onChange, disabled, label }: SwitchProps) {
    const theme = useTheme();
    const translateX = useRef(new Animated.Value(value ? THUMB_TRAVEL : 0)).current;
    const trackColor = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(translateX, {
                toValue: value ? THUMB_TRAVEL : 0,
                useNativeDriver: true,
                bounciness: 4,
            }),
            Animated.timing(trackColor, {
                toValue: value ? 1 : 0,
                duration: 180,
                useNativeDriver: false,
            }),
        ]).start();
    }, [value]);

    const interpolatedColor = trackColor.interpolate({
        inputRange: [0, 1],
        outputRange: [Color[theme].surfaceContainerHigh, Color[theme].primary],
    });

    return (
        <TouchableOpacity
            onPress={() => !disabled && onChange(!value)}
            disabled={disabled}
            activeOpacity={0.8}
            style={[s.row, { opacity: disabled ? 0.5 : 1 }]}
        >
            <Animated.View
                style={[
                    s.track,
                    { backgroundColor: interpolatedColor },
                ]}
            >
                <Animated.View
                    style={[
                        s.thumb,
                        {
                            backgroundColor: Color[theme].onPrimary,
                            transform: [{ translateX }],
                        },
                    ]}
                />
            </Animated.View>
            {label && (
                <Typo size={14} color="onSurface" weight={400}>
                    {label}
                </Typo>
            )}
        </TouchableOpacity>
    );
}

const s = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    track: {
        width: TRACK_WIDTH,
        height: TRACK_HEIGHT,
        borderRadius: TRACK_HEIGHT / 2,
        justifyContent: 'center',
        paddingHorizontal: THUMB_OFFSET,
    },
    thumb: {
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: THUMB_SIZE / 2,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
    },
});
