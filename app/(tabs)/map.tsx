import { Badge, BadgeSize, BadgeVariant, Column, Divider, Pressable, Row, Typo, TypoWeight } from '@/components/atoms';
import { NavBar } from '@/components/molecules';
import { Color } from '@/constants/color';
import { useTheme } from '@/hooks/useTheme';
import { Home, List, MapPin, Navigation, RotateCcw, Search, Settings, SlidersHorizontal, User } from 'lucide-react-native';
import { useState } from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const EXPANDED_HEIGHT = Math.round(SCREEN_HEIGHT * 0.6);
const COLLAPSED_HEIGHT = 180;
const NAVBAR_HEIGHT = Platform.OS === 'ios' ? 80 : 64;
const MAX_TRANSLATE = EXPANDED_HEIGHT - COLLAPSED_HEIGHT;

const places = [
    {
        id: 'coffee',
        name: '성수 브루잉 카페',
        address: '서울 성동구 연무장길 12',
        distance: '320m',
        category: '카페',
    },
    {
        id: 'park',
        name: '서울숲 산책로',
        address: '서울 성동구 뚝섬로 273',
        distance: '780m',
        category: '공원',
    },
    {
        id: 'restaurant',
        name: '한강 비스트로',
        address: '서울 성동구 왕십리로 83-21',
        distance: '1.1km',
        category: '식당',
    },
    {
        id: 'library',
        name: '동네 작은 도서관',
        address: '서울 성동구 상원길 7',
        distance: '1.4km',
        category: '도서관',
    },
    {
        id: 'market',
        name: '성수 로컬 마켓',
        address: '서울 성동구 아차산로 42',
        distance: '1.8km',
        category: '마켓',
    },
];

type FilterChip = {
    id: string;
    label: string;
    icon?: 'navigation' | 'sliders';
    active?: boolean;
};

const filters: FilterChip[] = [
    { id: 'nearby', label: '내 주변', icon: 'navigation', active: true },
    { id: 'filters', label: '필터', icon: 'sliders' },
    { id: 'cafe', label: '카페' },
    { id: 'restaurant', label: '음식점' },
    { id: 'bar', label: '바' },
];

export default function MapTab() {
    const theme = useTheme();
    const c = Color[theme];
    const insets = useSafeAreaInsets();
    const [isExpanded, setIsExpanded] = useState(false);

    const offset = useSharedValue(MAX_TRANSLATE);
    const startY = useSharedValue(MAX_TRANSLATE);

    const updateExpanded = (next: boolean) => setIsExpanded(next);

    const pan = Gesture.Pan()
        .onStart(() => {
            startY.value = offset.value;
        })
        .onUpdate((e) => {
            const next = startY.value + e.translationY;
            offset.value = next < 0 ? 0 : next > MAX_TRANSLATE ? MAX_TRANSLATE : next;
        })
        .onEnd((e) => {
            const shouldCollapse =
                e.velocityY > 600 ||
                (e.velocityY > -600 && offset.value > MAX_TRANSLATE / 2);
            offset.value = withSpring(shouldCollapse ? MAX_TRANSLATE : 0, {
                damping: 22,
                stiffness: 180,
                mass: 0.6,
            });
            runOnJS(updateExpanded)(!shouldCollapse);
        });

    const sheetAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: offset.value }],
    }));

    const fabBottom = COLLAPSED_HEIGHT + 48;

    const searchWrapperStyle: ViewStyle = {
        ...s.searchWrapper,
        top: insets.top + 12,
        backgroundColor: c.surface,
        shadowColor: c.shadow,
    };

    const sheetBottom = 0;

    const reSearchTop = insets.top + 120;

    return (
        <View style={[s.root, { backgroundColor: c.surface }]}>
            <View style={[s.mapFill, { backgroundColor: c.surfaceContainerHigh }]}>
                <Column align="center" gap={10} bgColor="transparent">
                    <MapPin size={48} color={c.primary} />
                    <Typo size={20} weight={TypoWeight.Bold} color="onSurface">
                        지도 영역
                    </Typo>
                    <Typo size={13} color="onSurfaceVariant" textAlign="center">
                        실제 지도 컴포넌트가 들어갈 위치입니다
                    </Typo>
                </Column>
            </View>

            <Pressable
                onPress={() => router.push('/(tabs)/search?autoFocus=1')}
                style={searchWrapperStyle}
            >
                <Row align="center" gap={8} style={s.fakeSearchBar}>
                    <Search size={20} color={c.onSurfaceVariant} />
                    <Typo size={15} color="onSurfaceVariant">
                        지역, 공간, 큐레이션 검색
                    </Typo>
                </Row>
            </Pressable>

            <View style={[s.chipRowWrap, { top: insets.top + 72 }]}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={s.chipRowContent}
                >
                    {filters.map((chip) => {
                        const active = !!chip.active;
                        const borderColor = active ? c.tertiary : c.outlineVariant;
                        const textColor = active ? c.tertiary : c.onSurface;
                        return (
                            <Pressable key={chip.id} onPress={() => {}}>
                                <Row
                                    align="center"
                                    gap={6}
                                    style={{
                                        ...s.chip,
                                        backgroundColor: c.surface,
                                        borderColor,
                                        shadowColor: c.shadow,
                                    }}
                                >
                                    {chip.icon === 'navigation' && (
                                        <Navigation size={14} color={textColor} />
                                    )}
                                    {chip.icon === 'sliders' && (
                                        <SlidersHorizontal size={14} color={textColor} />
                                    )}
                                    <Typo
                                        size={13}
                                        weight={TypoWeight.Medium}
                                        style={{ color: textColor }}
                                    >
                                        {chip.label}
                                    </Typo>
                                </Row>
                            </Pressable>
                        );
                    })}
                </ScrollView>
            </View>

            <View style={[s.reSearchWrap, { top: reSearchTop }]}>
                <Pressable onPress={() => {}}>
                    <Row
                        align="center"
                        gap={6}
                        style={{
                            ...s.reSearchPill,
                            backgroundColor: c.surface,
                            shadowColor: c.shadow,
                        }}
                    >
                        <RotateCcw size={14} color={c.onSurface} />
                        <Typo
                            size={13}
                            weight={TypoWeight.Medium}
                            color="onSurface"
                        >
                            현 지도에서 재검색
                        </Typo>
                    </Row>
                </Pressable>
            </View>

            <Column gap={12} style={{ ...s.fabColumn, bottom: fabBottom }} bgColor="transparent">
                <Pressable onPress={() => {}}>
                    <View
                        style={{
                            ...s.fab,
                            backgroundColor: c.surface,
                            borderColor: c.outlineVariant,
                            shadowColor: c.shadow,
                        }}
                    >
                        <Navigation size={20} color={c.onSurface} />
                    </View>
                </Pressable>
                <Pressable onPress={() => {}}>
                    <View
                        style={{
                            ...s.fab,
                            backgroundColor: c.surface,
                            borderColor: c.outlineVariant,
                            shadowColor: c.shadow,
                        }}
                    >
                        <List size={20} color={c.onSurface} />
                    </View>
                </Pressable>
            </Column>

            <GestureDetector gesture={pan}>
                <Animated.View
                    style={[
                        s.sheet,
                        {
                        backgroundColor: c.surface,
                        shadowColor: c.shadow,
                        bottom: sheetBottom,
                    },
                        sheetAnimatedStyle,
                    ]}
                >
                    <View style={s.handleRow}>
                        <View style={[s.handle, { backgroundColor: c.outline }]} />
                    </View>

                    <Column gap={4} style={s.sheetHeader}>
                        <Typo size={20} weight={TypoWeight.Bold} color="onSurface">
                            주변 장소
                        </Typo>
                        <Typo size={13} color="onSurfaceVariant">
                            현재 지도에서 가까운 장소
                        </Typo>
                    </Column>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={isExpanded}
                        contentContainerStyle={s.placeList}
                    >
                        {places.map((place, idx) => (
                            <View key={place.id}>
                                <Row gap={12} align="center" style={s.placeRow}>
                                    <View
                                        style={{
                                            ...s.placeIcon,
                                            backgroundColor: c.surfaceContainer,
                                        }}
                                    >
                                        <MapPin size={20} color={c.tertiary} />
                                    </View>
                                    <Column gap={4} style={s.placeContent}>
                                        <Typo
                                            size={15}
                                            weight={TypoWeight.SemiBold}
                                            color="onSurface"
                                            numberOfLines={1}
                                        >
                                            {place.name}
                                        </Typo>
                                        <Typo
                                            size={13}
                                            color="onSurfaceVariant"
                                            numberOfLines={1}
                                        >
                                            {place.category} · {place.address}
                                        </Typo>
                                    </Column>
                                    <Badge
                                        variant={BadgeVariant.BRAND}
                                        size={BadgeSize.SMALL}
                                    >
                                        {place.distance}
                                    </Badge>
                                </Row>
                                {idx < places.length - 1 && <Divider />}
                            </View>
                        ))}
                    </ScrollView>
                </Animated.View>
            </GestureDetector>

            <NavBar>
                <NavBar.Item icon={<Home />} selected={false} screenName="/(tabs)">
                    홈
                </NavBar.Item>
                <NavBar.Item icon={<Search />} selected={false} screenName="/(tabs)/search">
                    검색
                </NavBar.Item>
                <NavBar.Item icon={<MapPin />} selected screenName="/(tabs)/map">
                    지도
                </NavBar.Item>
                <NavBar.Item icon={<User />} selected={false} screenName="/(tabs)/profile">
                    프로필
                </NavBar.Item>
                <NavBar.Item icon={<Settings />} selected={false} screenName="/(tabs)/settings">
                    설정
                </NavBar.Item>
            </NavBar>
        </View>
    );
}

const s = StyleSheet.create({
    root: {
        flex: 1,
    },
    mapFill: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    searchWrapper: {
        position: 'absolute',
        left: 16,
        right: 16,
        borderRadius: 24,
        overflow: 'hidden',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        zIndex: 10,
    },
    fakeSearchBar: {
        height: 48,
        borderRadius: 24,
        paddingHorizontal: 16,
    },
    chipRowWrap: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 9,
        backgroundColor: 'transparent',
    },
    chipRowContent: {
        paddingHorizontal: 16,
        gap: 8,
        alignItems: 'center',
    },
    chip: {
        height: 36,
        borderRadius: 20,
        paddingHorizontal: 14,
        borderWidth: 1,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },
    reSearchWrap: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 8,
        backgroundColor: 'transparent',
    },
    reSearchPill: {
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 8,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 4,
    },
    fabColumn: {
        position: 'absolute',
        right: 16,
        zIndex: 2,
    },
    fab: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 4,
    },
    sheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: EXPANDED_HEIGHT,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
        zIndex: 5,
    },
    handleRow: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 8,
    },
    handle: {
        width: 36,
        height: 4,
        borderRadius: 2,
        opacity: 0.4,
    },
    sheetHeader: {
        marginBottom: 14,
        marginTop: 4,
    },
    placeList: {
        paddingBottom: 32,
    },
    placeRow: {
        paddingVertical: 12,
    },
    placeIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeContent: {
        flex: 1,
    },
});
