import { useRef, useEffect } from 'react';
import { Animated, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { TabsProps } from './Tabs.type';
import { Typo } from '@/components/atoms/Typo';
import { Badge } from '@/components/atoms/Badge';
import { BadgeSize, BadgeVariant } from '@/components/atoms/Badge/Badge.type';

export default function Tabs({ tabs, value, onChange, disabled }: TabsProps) {
    const theme = useTheme();
    const indicatorAnim = useRef(new Animated.Value(0)).current;
    const tabWidths = useRef<number[]>([]);
    const tabOffsets = useRef<number[]>([]);

    const activeIndex = tabs.findIndex((t) => t.value === value);

    useEffect(() => {
        if (tabWidths.current[activeIndex] !== undefined) {
            Animated.spring(indicatorAnim, {
                toValue: tabOffsets.current[activeIndex] ?? 0,
                useNativeDriver: true,
                bounciness: 0,
                speed: 20,
            }).start();
        }
    }, [activeIndex]);

    return (
        <View style={[s.wrapper, { borderBottomColor: Color[theme].border }]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.container}>
                {tabs.map((tab, index) => {
                    const isActive = tab.value === value;
                    return (
                        <TouchableOpacity
                            key={tab.value}
                            onPress={() => !disabled && onChange(tab.value)}
                            disabled={disabled}
                            activeOpacity={0.7}
                            style={s.tab}
                            onLayout={(e) => {
                                tabWidths.current[index] = e.nativeEvent.layout.width;
                                tabOffsets.current[index] = e.nativeEvent.layout.x;
                                if (index === activeIndex) {
                                    indicatorAnim.setValue(e.nativeEvent.layout.x);
                                }
                            }}
                        >
                            <Typo
                                size={14}
                                weight={isActive ? 600 : 400}
                                color={isActive ? 'textBrand' : 'textSecondary'}
                            >
                                {tab.label}
                            </Typo>
                            {tab.badge !== undefined && tab.badge > 0 && (
                                <Badge variant={BadgeVariant.BRAND} size={BadgeSize.SMALL}>
                                    {String(tab.badge)}
                                </Badge>
                            )}
                        </TouchableOpacity>
                    );
                })}

                {tabWidths.current[activeIndex] !== undefined && (
                    <Animated.View
                        style={[
                            s.indicator,
                            {
                                backgroundColor: Color[theme].brand60,
                                width: tabWidths.current[activeIndex],
                                transform: [{ translateX: indicatorAnim }],
                            },
                        ]}
                    />
                )}
            </ScrollView>
        </View>
    );
}

const s = StyleSheet.create({
    wrapper: {
        borderBottomWidth: 1,
    },
    container: {
        flexDirection: 'row',
        position: 'relative',
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 4,
    },
    indicator: {
        position: 'absolute',
        bottom: 0,
        height: 2,
        borderRadius: 2,
    },
});
