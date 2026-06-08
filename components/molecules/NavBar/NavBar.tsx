import { Row } from '@/components/atoms/Row';
import { WithChildren } from '@/types/components';
import { Platform, StyleSheet } from 'react-native';
import { NavBarItemProps } from './NavBar.type';
import { Column } from '@/components/atoms/Column';
import { Typo } from '@/components/atoms/Typo';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { cloneElement, isValidElement } from 'react';
import { ColorToken } from '@/types/color';
import { useRouter } from 'expo-router';

export default function NavBar({ children }: WithChildren) {
    const theme = useTheme();

    return (
        <Row
            fullWidth
            justify="space-around"
            style={{
                borderTopColor: Color[theme].outlineVariant,
                backgroundColor: Color[theme].surface,
                ...s.container,
            }}
        >
            {children}
        </Row>
    );
}

function NavBarItem({ children, icon, screenName, selected }: NavBarItemProps) {
    const theme = useTheme();
    const router = useRouter();

    const color = {
        icon: selected ? Color[theme].primary : Color[theme].onSurfaceVariant,
        text: selected ? 'primary' : 'onSurfaceVariant',
    };

    // Icon의 사이즈를 24로 고정
    const clonedIcon = isValidElement(icon)
        ? cloneElement(icon as React.ReactElement<any>, {
              size: 22,
              color: color.icon,
          })
        : null;

    return (
        <Column
            as="hoverable"
            align="center"
            gap={2}
            style={s.item}
            onPress={() => router.push(screenName)}
        >
            {clonedIcon}
            <Typo size={14} color={color.text as ColorToken} weight={400}>
                {children}
            </Typo>
        </Column>
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

        paddingBottom: Platform.OS === 'ios' ? 24 : 10, // iOS는 36px, Android는 24px

        borderTopWidth: 1,

        borderRadius: 16,
    },
    item: {
        paddingHorizontal: 10,
    },
});
