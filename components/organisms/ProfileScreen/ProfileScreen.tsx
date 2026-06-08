import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { Avatar, AvatarSize, AvatarShape } from '@/components/atoms/Avatar';
import { Typo } from '@/components/atoms/Typo';
import { Divider } from '@/components/atoms/Divider';
import { Button, ButtonVariant, ButtonSize } from '@/components/atoms/Button';
import { Row } from '@/components/atoms/Row';
import { Column } from '@/components/atoms/Column';
import { Card } from '@/components/molecules/Card';
import { ListItem } from '@/components/molecules/ListItem';
import { ProfileScreenProps } from './ProfileScreen.type';

export default function ProfileScreen({
    name,
    bio,
    avatarSrc,
    stats = [],
    menuSections = [],
    onEditProfile,
    onShare,
}: ProfileScreenProps) {
    const theme = useTheme();
    const colors = Color[theme];

    return (
        <ScrollView
            style={[s.container, { backgroundColor: colors.surface }]}
            contentContainerStyle={s.content}
            showsVerticalScrollIndicator={false}
        >
            {/* Hero */}
            <Column align="center" gap={14} bgColor="transparent" style={s.hero}>
                <View style={[s.avatarRing, { borderColor: colors.outlineVariant }]}>
                    <Avatar
                        src={avatarSrc}
                        name={name}
                        size={AvatarSize.XL}
                        shape={AvatarShape.CIRCLE}
                    />
                </View>
                <Column align="center" gap={12} bgColor="transparent">
                    <Typo size={26} weight={700} color="onSurface">
                        {name}
                    </Typo>
                    {bio && (
                        <Typo
                            size={14}
                            weight={400}
                            color="onSurfaceVariant"
                            textAlign="center"
                            style={s.bio}
                        >
                            {bio}
                        </Typo>
                    )}
                </Column>
            </Column>

            {/* Stats */}
            {stats.length > 0 && (
                <Card variant="sub" style={s.statsCard}>
                    {stats.map((stat, index) => (
                        <Row key={stat.label} fullWidth={false} bgColor="transparent" style={s.statWrapper}>
                            <Column align="center" gap={6} bgColor="transparent" style={s.statItem}>
                                <Typo size={20} weight={700} color="onSurface">
                                    {stat.value}
                                </Typo>
                                <Typo size={12} weight={400} color="onSurfaceVariant">
                                    {stat.label}
                                </Typo>
                            </Column>
                            {index < stats.length - 1 && (
                                <Divider direction="vertical" style={s.statDivider} />
                            )}
                        </Row>
                    ))}
                </Card>
            )}

            {/* Action buttons */}
            {(onEditProfile || onShare) && (
                <Row gap={10} bgColor="transparent" style={s.actions}>
                    {onEditProfile && (
                        <View style={s.actionBtn}>
                            <Button
                                variant={ButtonVariant.BRAND}
                                size={ButtonSize.MEDIUM}
                                fullWidth
                                fullRadius
                                onPress={onEditProfile}
                            >
                                프로필 편집
                            </Button>
                        </View>
                    )}
                    {onShare && (
                        <View style={s.actionBtn}>
                            <Button
                                variant={ButtonVariant.SECONDARY}
                                size={ButtonSize.MEDIUM}
                                fullWidth
                                fullRadius
                                onPress={onShare}
                            >
                                공유
                            </Button>
                        </View>
                    )}
                </Row>
            )}

            {/* Menu sections */}
            {menuSections.map((section, sectionIdx) => (
                <View key={sectionIdx} style={s.section}>
                    {section.title && (
                        <Typo size={12} weight={600} color="onSurfaceVariant" style={s.sectionLabel}>
                            {section.title.toUpperCase()}
                        </Typo>
                    )}
                    <Card variant="sub" style={s.menuCard}>
                        {section.items.map((item, itemIdx) => (
                            <View key={item.id}>
                                <ListItem
                                    title={item.label}
                                    description={item.description}
                                    leadingIcon={
                                        item.leadingIcon ? (
                                            <View
                                                style={[
                                                    s.menuIconWrap,
                                                    { backgroundColor: colors.surfaceContainerHigh },
                                                ]}
                                            >
                                                {item.leadingIcon}
                                            </View>
                                        ) : undefined
                                    }
                                    trailingText={item.trailingText}
                                    onPress={item.onPress}
                                    destructive={item.destructive}
                                />
                                {itemIdx < section.items.length - 1 && (
                                    <Divider />
                                )}
                            </View>
                        ))}
                    </Card>
                </View>
            ))}
        </ScrollView>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingBottom: 48,
        gap: 20,
    },
    hero: {
        paddingTop: 36,
        paddingHorizontal: 24,
        paddingBottom: 4,
    },
    avatarRing: {
        borderRadius: 999,
        borderWidth: 3,
        padding: 3,
    },
    bio: {
        maxWidth: 260,
    },
    statsCard: {
        marginHorizontal: 20,
        borderRadius: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    statWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statDivider: {
        height: 28,
        width: 1,
        alignSelf: 'center',
    },
    actions: {
        paddingHorizontal: 20,
    },
    actionBtn: {
        flex: 1,
    },
    section: {
        gap: 8,
        paddingHorizontal: 20,
    },
    sectionLabel: {
        paddingHorizontal: 4,
        letterSpacing: 0.6,
    },
    menuCard: {
        borderRadius: 20,
    },
    menuIconWrap: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
