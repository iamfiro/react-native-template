import { useRef, useEffect } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { CheckboxProps, CheckboxSize } from './Checkbox.type';
import { Typo } from '../Typo';

const SIZE_MAP = {
    [CheckboxSize.SMALL]: 18,
    [CheckboxSize.MEDIUM]: 22,
    [CheckboxSize.LARGE]: 26,
};

export default function Checkbox({
    checked,
    onChange,
    disabled,
    size = CheckboxSize.MEDIUM,
    label,
}: CheckboxProps) {
    const theme = useTheme();
    const scaleAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;
    const boxSize = SIZE_MAP[size];

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: checked ? 1 : 0,
            useNativeDriver: true,
            bounciness: 8,
        }).start();
    }, [checked]);

    return (
        <TouchableOpacity
            onPress={() => !disabled && onChange(!checked)}
            disabled={disabled}
            activeOpacity={0.7}
            style={[s.row, { opacity: disabled ? 0.5 : 1 }]}
        >
            <View
                style={[
                    s.box,
                    {
                        width: boxSize,
                        height: boxSize,
                        borderRadius: 6,
                        borderColor: checked
                            ? Color[theme].borderBrand
                            : Color[theme].border,
                        borderWidth: checked ? 0 : 1.5,
                        backgroundColor: checked
                            ? Color[theme].brand60
                            : Color[theme].surface,
                    },
                ]}
            >
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <CheckIcon size={boxSize * 0.6} color={Color[theme].white} />
                </Animated.View>
            </View>
            {label && (
                <Typo size={14} color="text" weight={400}>
                    {label}
                </Typo>
            )}
        </TouchableOpacity>
    );
}

function CheckIcon({ size, color }: { size: number; color: string }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M5 12l5 5L19 7"
                stroke={color}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

const s = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
