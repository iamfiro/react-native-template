import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { ListItemProps } from './ListItem.type';
import { Typo } from '@/components/atoms/Typo';
import { Icon } from '@/components/atoms/Icon';

export default function ListItem({
    title,
    description,
    leadingIcon,
    trailingIcon,
    trailingText,
    onPress,
    disabled,
    showChevron = !!onPress,
    destructive = false,
}: ListItemProps) {
    const theme = useTheme();

    const Container = onPress ? TouchableOpacity : View;

    return (
        <Container
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
            style={[s.row, { opacity: disabled ? 0.5 : 1 }]}
        >
            {leadingIcon && (
                <View style={s.leading}>
                    {leadingIcon}
                </View>
            )}

            <View style={s.content}>
                <Typo size={15} weight={500} color={destructive ? 'error' : 'onSurface'}>
                    {title}
                </Typo>
                {description && (
                    <Typo size={13} weight={400} color="onSurfaceVariant">
                        {description}
                    </Typo>
                )}
            </View>

            <View style={s.trailing}>
                {trailingText && (
                    <Typo size={13} weight={400} color="onSurfaceVariant">
                        {trailingText}
                    </Typo>
                )}
                {trailingIcon && trailingIcon}
                {showChevron && !trailingIcon && (
                    <Icon name="chevronRight" size={20} color={Color[theme].onSurfaceVariant} />
                )}
            </View>
        </Container>
    );
}

const s = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        gap: 12,
    },
    leading: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        gap: 2,
    },
    trailing: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
});
