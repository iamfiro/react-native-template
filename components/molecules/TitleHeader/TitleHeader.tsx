import { StyleSheet, TouchableOpacity } from 'react-native';
import { TitleHeaderProps } from './TitleHeader.type';
import { Row } from '../../atoms/Row';
import { Typo } from '../../atoms/Typo';
import { ChevronLeft } from 'lucide-react-native';
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

    return (
        <Row
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
            <Row
                align="center"
                onLayout={(e) => setChevronWidth(e.nativeEvent.layout.width)}
            >
                <Row
                    as="hoverable"
                    align="center"
                    onPress={() => navigation.goBack()}
                >
                    {showBackButton && <ChevronLeft size={40} color={Color[theme].onSurfaceVariant} />}
                    {backButtonText && (
                        <Typo size={14} color='onSurfaceVariant' style={{ marginLeft: -6 }}>
                            {backButtonText}
                        </Typo>
                    )}
                </Row>
            </Row>
            <Typo>{children}</Typo>
            <Box
                as="hoverable"
                style={{
                    minWidth: chevronWidth,
                }}
            >
                {rightContent}
            </Box>
        </Row>
    );
}
