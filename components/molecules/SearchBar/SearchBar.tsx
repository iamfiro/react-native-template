import { useRef, useState } from 'react';
import { Animated, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { SearchBarProps } from './SearchBar.type';
import { Icon } from '@/components/atoms/Icon';

export default function SearchBar({
    value,
    onChange,
    onSubmit,
    onClear,
    placeholder = '검색',
    autoFocus,
}: SearchBarProps) {
    const theme = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const borderAnim = useRef(new Animated.Value(0)).current;

    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(borderAnim, { toValue: 1, duration: 200, useNativeDriver: false }).start();
    };

    const handleBlur = () => {
        setIsFocused(false);
        Animated.timing(borderAnim, { toValue: 0, duration: 200, useNativeDriver: false }).start();
    };

    const borderColor = borderAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [Color[theme].border, Color[theme].borderBrand],
    });

    return (
        <Animated.View
            style={[
                s.container,
                {
                    backgroundColor: Color[theme].surface,
                    borderColor,
                    borderWidth: isFocused ? 2 : 1,
                },
            ]}
        >
            <Icon name="search" size={20} color={isFocused ? Color[theme].textBrand : Color[theme].textSecondary} />
            <TextInput
                value={value}
                onChangeText={onChange}
                onSubmitEditing={onSubmit}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
                placeholderTextColor={Color[theme].textSecondary}
                returnKeyType="search"
                autoFocus={autoFocus}
                style={[s.input, { color: Color[theme].text }]}
            />
            {value.length > 0 && (
                <TouchableOpacity
                    onPress={() => { onChange(''); onClear?.(); }}
                    activeOpacity={0.7}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                    <Icon name="close" size={18} color={Color[theme].textSecondary} />
                </TouchableOpacity>
            )}
        </Animated.View>
    );
}

const s = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        borderRadius: 14,
        paddingHorizontal: 14,
        gap: 8,
    },
    input: {
        flex: 1,
        fontSize: 15,
        fontFamily: 'PretendardMedium',
        padding: 0,
    },
});
