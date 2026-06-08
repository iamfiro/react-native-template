import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { Typo } from '@/components/atoms/Typo';
import { SettingsScreenProps, SettingsItem } from './SettingsScreen.type';

function SettingsRow({ item }: { item: SettingsItem }) {
    const theme = useTheme();

    if (item.type === 'custom') {
        return <View>{item.render}</View>;
    }

    const content = (
        <View style={s.row}>
            {item.leadingIcon && (
                <View style={s.leading}>{item.leadingIcon}</View>
            )}
            <View style={s.labelWrap}>
                <Typo
                    size={17}
                    weight={400}
                    color={item.destructive ? 'error' : 'onSurface'}
                >
                    {item.label}
                </Typo>
                {item.description && (
                    <Typo size={13} weight={400} color="onSurfaceVariant">
                        {item.description}
                    </Typo>
                )}
            </View>
            {(item.trailingText || item.trailingIcon) && (
                <View style={s.trailing}>
                    {item.trailingText && (
                        <Typo size={14} weight={400} color="onSurfaceVariant">
                            {item.trailingText}
                        </Typo>
                    )}
                    {item.trailingIcon}
                </View>
            )}
        </View>
    );

    if (!item.onPress) return content;

    return (
        <TouchableOpacity
            onPress={item.onPress}
            disabled={item.disabled}
            activeOpacity={0.6}
            style={{ opacity: item.disabled ? 0.5 : 1 }}
        >
            {content}
        </TouchableOpacity>
    );
}

export default function SettingsScreen({ sections, header }: SettingsScreenProps) {
    const theme = useTheme();

    return (
        <ScrollView
            style={[s.container, { backgroundColor: Color[theme].surface }]}
            contentContainerStyle={s.content}
            showsVerticalScrollIndicator={false}
        >
            {header && <View style={s.header}>{header}</View>}

            {sections.map((section, sectionIdx) => (
                <View key={sectionIdx} style={[s.section, section.style]}>
                    {section.title && (
                        <Typo
                            size={13}
                            weight={500}
                            color="onSurfaceVariant"
                            style={s.sectionTitle}
                        >
                            {section.title}
                        </Typo>
                    )}

                    <View>
                        {section.items.map((item) => (
                            <SettingsRow key={item.id} item={item} />
                        ))}
                    </View>

                    {section.footer && (
                        <Typo
                            size={12}
                            weight={400}
                            color="onSurfaceVariant"
                            style={s.sectionFooter}
                        >
                            {section.footer}
                        </Typo>
                    )}
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
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 8,
    },
    section: {
        paddingTop: 26,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        gap: 14,
    },
    leading: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelWrap: {
        flex: 1,
        gap: 2,
    },
    trailing: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    sectionFooter: {
        marginTop: 6,
        lineHeight: 18,
    },
});
