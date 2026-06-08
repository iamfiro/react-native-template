import {
    cloneElement,
    forwardRef,
    isValidElement,
    useRef,
    useState,
} from 'react';
import { Animated, StyleSheet, TextInput, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { InputProps, InputRef } from './Input.type';
import { Row } from '../Row';

const Input = forwardRef<InputRef, InputProps>(
    ({ error, leadingIcon, style, ...props }, ref) => {
        const theme = useTheme();
        const [isFocused, setIsFocused] = useState(false);
        const animatedValue = useRef(new Animated.Value(0)).current;

        let clonedLeadingIcon = null;
        if (isValidElement(leadingIcon)) {
            clonedLeadingIcon = cloneElement(
                leadingIcon as React.ReactElement<any>,
                {
                    style: { color: Color[theme].onSurfaceVariant },
                    color: isFocused
                        ? Color[theme].onSurface
                        : Color[theme].onSurfaceVariant,
                },
            );
        }
        const handleFocus = () => {
            setIsFocused(true);
            Animated.timing(animatedValue, {
                toValue: 2,
                duration: 200,
                useNativeDriver: false,
            }).start();
        };

        const handleBlur = () => {
            setIsFocused(false);
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
        };

        return (
            <Row
                style={[
                    {
                        borderColor: error
                            ? Color[theme].error
                            : isFocused
                              ? Color[theme].primary
                              : Color[theme].outlineVariant,
                        borderWidth: error || isFocused ? 2 : 1,
                        ...s.container,
                    },
                ]}
                align="center"
                gap={4}
            >
                {clonedLeadingIcon && clonedLeadingIcon}
                <TextInput
                    ref={ref}
                    style={{
                        flex: 1,
                        color: Color[theme].onSurface,

                        fontSize: 15,
                        fontFamily: 'PretendardMedium',
                    }}
                    placeholderTextColor={Color[theme].onSurfaceVariant}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...props}
                />
            </Row>
        );
    },
);

const s = StyleSheet.create({
    container: {
        borderRadius: 16,

        height: 56,

        paddingHorizontal: 14,
    },
});

export default Input;
