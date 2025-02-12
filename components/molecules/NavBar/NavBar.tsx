import { VStack } from '@/components/atoms/VStack';
import { WithChildren } from '@/types/components';
import { Platform, StyleSheet } from 'react-native';
import { NavBarItemProps } from './NavBar.type';
import { HStack } from '@/components/atoms/HStack';
import { Typo } from '@/components/atoms/Typo';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { cloneElement, isValidElement } from 'react';
import { VariantColorType } from '@/types/color';
import { RelativePathString, useRouter } from 'expo-router';

export default function NavBar({ children }: WithChildren) {
    const theme = useTheme();

    return (
        <VStack
            fullWidth
            justify="space-around"
            style={{
                borderTopColor: Color[theme].border,
                backgroundColor: Color[theme].surface,
                ...s.container,
            }}
        >
            {children}
        </VStack>
    );
}

function NavBarItem({ children, icon, screenName, selected }: NavBarItemProps) {
    const theme = useTheme();
    const router = useRouter();

    const color = {
        icon: selected ? Color[theme].textBrand : Color[theme].textSecondary,
        text: selected ? 'textBrand' : 'textSecondary',
    };

    // Icon의 사이즈를 24로 고정
    const clonedIcon = isValidElement(icon)
        ? cloneElement(icon as React.ReactElement<any>, {
              size: 22,
              color: color.icon,
          })
        : null;

    return (
        <HStack
            as="hoverable"
            align="center"
            gap={2}
            style={s.item}
            onPress={() => router.push(screenName)}
        >
            {clonedIcon}
            <Typo size={14} color={color.text as VariantColorType} weight={400}>
                {children}
            </Typo>
        </HStack>
    );
}

NavBar.Item = NavBarItem;

const s = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        zIndex: 1,

        paddingHorizontal: 16,
        paddingTop: 10,

        paddingBottom: Platform.OS === 'ios' ? 36 : 10, // iOS는 36px, Android는 24px

        borderTopWidth: 1,
    },
    item: {
        paddingHorizontal: 10,
    },
});
