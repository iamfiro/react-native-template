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
import { VStack } from '../VStack';

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
                    style: { color: Color[theme].textSecondary },
                    color: isFocused
                        ? Color[theme].text
                        : Color[theme].textSecondary,
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
            <VStack
                style={[
                    {
                        borderColor: error
                            ? Color[theme].borderError
                            : isFocused
                              ? Color[theme].borderBrand
                              : Color[theme].border,
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
                        color: Color[theme].text,

                        fontSize: 15,
                        fontFamily: 'PretendardMedium',
                    }}
                    placeholderTextColor={Color[theme].textSecondary}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...props}
                />
            </VStack>
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
