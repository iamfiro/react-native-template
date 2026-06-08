import { useRef, useEffect } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { RadioProps, RadioGroupProps } from './Radio.type';
import { Typo } from '../Typo';

export default function Radio({
    selected,
    onChange,
    disabled,
    label,
}: RadioProps) {
    const theme = useTheme();
    const scaleAnim = useRef(new Animated.Value(selected ? 1 : 0)).current;

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: selected ? 1 : 0,
            useNativeDriver: true,
            bounciness: 8,
        }).start();
    }, [selected]);

    return (
        <TouchableOpacity
            onPress={() => !disabled && onChange()}
            disabled={disabled}
            activeOpacity={0.7}
            style={[s.row, { opacity: disabled ? 0.5 : 1 }]}
        >
            <View
                style={[
                    s.circle,
                    {
                        borderColor: selected
                            ? Color[theme].primary
                            : Color[theme].outlineVariant,
                    },
                ]}
            >
                <Animated.View
                    style={[
                        s.dot,
                        {
                            backgroundColor: Color[theme].primary,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                />
            </View>
            {label && (
                <Typo size={14} color="onSurface" weight={400}>
                    {label}
                </Typo>
            )}
        </TouchableOpacity>
    );
}

function RadioGroup({ options, value, onChange, disabled, direction = 'column' }: RadioGroupProps) {
    return (
        <View style={[s.group, direction === 'row' ? s.row : s.column]}>
            {options.map((option) => (
                <Radio
                    key={option.value}
                    selected={option.value === value}
                    onChange={() => onChange(option.value)}
                    disabled={disabled}
                    label={option.label}
                />
            ))}
        </View>
    );
}

Radio.Group = RadioGroup;

const s = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    column: {
        flexDirection: 'column',
        gap: 12,
    },
    group: {},
    circle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
});
