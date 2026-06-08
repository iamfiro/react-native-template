import { StyleSheet, View } from 'react-native';
import { EmptyStateProps } from './EmptyState.type';
import { Typo } from '@/components/atoms/Typo';
import { Button, ButtonVariant, ButtonSize } from '@/components/atoms/Button';

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <View style={s.container}>
            {icon && <View style={s.icon}>{icon}</View>}
            <Typo size={17} weight={600} color="onSurface" textAlign="center">
                {title}
            </Typo>
            {description && (
                <Typo size={14} weight={400} color="onSurfaceVariant" textAlign="center">
                    {description}
                </Typo>
            )}
            {action && (
                <Button
                    variant={ButtonVariant.BRAND}
                    size={ButtonSize.MEDIUM}
                    onPress={action.onPress}
                >
                    {action.label}
                </Button>
            )}
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        padding: 32,
    },
    icon: {
        marginBottom: 4,
    },
});
