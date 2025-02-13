import { useTheme } from '@/hooks/useTheme';
import { SegmentProps } from './Segment.type';
import { useCallback } from 'react';
import { VStack } from '@/components/atoms/VStack';
import { StyleSheet } from 'react-native';
import { Color } from '@/constants/color';
import { Box } from '@/components/atoms/Box';
import { Typo } from '@/components/atoms/Typo';

export default function Segment({
    options,
    value,
    onChange,
    disabled,
}: SegmentProps) {
    const theme = useTheme();

    const handlePress = useCallback(
        (selectedValue: string) => {
            if (disabled) return;
            onChange(selectedValue);
        },
        [disabled, onChange],
    );

    return (
        <VStack style={s.container} gap={4} bgColor="surfaceSecondary">
            {options.map((option) => {
                const isSelected = option.value === value;

                return (
                    <Box
                        as={isSelected ? 'view' : 'hoverable'}
                        justify="center"
                        align="center"
                        key={option.value}
                        bgColor={
                            isSelected
                                ? theme === 'light'
                                    ? 'surface'
                                    : 'surfaceTertiary'
                                : 'surfaceSecondary'
                        }
                        style={{
                            boxShadow:
                                isSelected && theme === 'light'
                                    ? '0 0 5px #00000010'
                                    : undefined,
                            ...s.segment,
                        }}
                        onPress={() => handlePress(option.value)}
                    >
                        <Typo>{option.label}</Typo>
                    </Box>
                );
            })}
        </VStack>
    );
}

const s = StyleSheet.create({
    container: {
        padding: 6,

        borderRadius: 9999,
    },
    segment: {
        flex: 1,

        height: 40,

        paddingVertical: 8,
        paddingHorizontal: 16,

        borderRadius: 9999,
    },
    selectedSegment: {
        borderRadius: 6,
    },
});
