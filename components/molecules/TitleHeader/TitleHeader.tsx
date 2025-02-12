import { StyleSheet, TouchableOpacity } from 'react-native';
import { TitleHeaderProps } from '.';
import { VStack } from '../../atoms/VStack';
import { Typo } from '../../atoms/Typo';
import { Icon } from '../../icon/glyph';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { Box } from '../../atoms/Box';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';

export default function TitleHeader({
    children,
    showBackButton,
    backButtonText,
    rightContent,
}: TitleHeaderProps) {
    const theme = useTheme();
    const navigation = useNavigation();
    const [chevronWidth, setChevronWidth] = useState(0);

    useEffect(() => {
        console.log(chevronWidth);
    }, [chevronWidth]);

    return (
        <VStack
            fullWidth
            style={{
                height: 46,
                paddingHorizontal: 12,
                backgroundColor: Color[theme].surface,
            }}
            justify={
                !showBackButton && !rightContent ? 'center' : 'space-between'
            }
            align="center"
        >
            <VStack align='center' onLayout={(e) => setChevronWidth(e.nativeEvent.layout.width)}>
                {showBackButton && (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon.chevronLeft size={40} />
                    </TouchableOpacity>
                )}
                {backButtonText && <Typo size={14} style={{marginLeft: -4}}>{backButtonText}</Typo>}
            </VStack>
            <Typo>{children}</Typo>
            <Box
                as='hoverable'
                style={{
                    minWidth: chevronWidth,
                }}
            >
                {rightContent}
            </Box>
        </VStack>
    );
}
