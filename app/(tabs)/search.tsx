import { Column, Divider, Pressable, Row, Typo, TypoWeight } from '@/components/atoms';
import { NavBar, SearchBar } from '@/components/molecules';
import { Color } from '@/constants/color';
import { useTheme } from '@/hooks/useTheme';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Home, Search, Settings, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

const POPULAR_KEYWORDS: string[] = [
    '주말 브런치 카페',
    '서울 러닝 코스',
    '홈트레이닝 루틴',
    '제주도 감성 숙소',
    '독립서점 추천',
    '간단 저녁 레시피',
    '을지로 전시회',
    '성수동 맛집',
    '아침 명상 가이드',
    '북촌 산책 코스',
];

export default function SearchScreen() {
    const theme = useTheme();
    const c = Color[theme];
    const [keyword, setKeyword] = useState('');
    const { autoFocus } = useLocalSearchParams<{ autoFocus?: string }>();

    const leftColumn = POPULAR_KEYWORDS.slice(0, 5);
    const rightColumn = POPULAR_KEYWORDS.slice(5, 10);

    const renderRankRow = (text: string, rank: number) => {
        const isTopThree = rank <= 3;
        return (
            <Row key={rank} align="center" gap={12} style={s.rankRow}>
                <View style={s.rankNumberWrap}>
                    <Typo
                        size={15}
                        weight={TypoWeight.Bold}
                        color={isTopThree ? 'tertiary' : 'onSurface'}
                    >
                        {rank}
                    </Typo>
                </View>
                <Typo
                    size={15}
                    weight={TypoWeight.Regular}
                    color="onSurface"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={s.rankKeyword}
                >
                    {text}
                </Typo>
            </Row>
        );
    };

    return (
        <>
            <SafeAreaView style={[s.container, { backgroundColor: c.surface }]}>
                <Row align="center" gap={8} style={s.header}>
                    <Pressable onPress={() => router.back()} style={s.backButton}>
                        <ChevronLeft size={24} color={c.onSurface} />
                    </Pressable>
                    <View style={s.searchBarWrap}>
                        <SearchBar
                            value={keyword}
                            onChange={setKeyword}
                            onClear={() => setKeyword('')}
                            placeholder="검색어를 입력하세요"
                            autoFocus={autoFocus === '1'}
                        />
                    </View>
                </Row>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={s.scrollContent}
                >
                    <Column>
                        <Row align="center" justify="space-between" style={s.sectionHeader}>
                            <Typo size={16} weight={TypoWeight.Bold} color="onSurface">
                                최근 검색어
                            </Typo>
                            <Pressable onPress={() => undefined}>
                                <Typo
                                    size={13}
                                    weight={TypoWeight.Medium}
                                    color="onSurfaceVariant"
                                >
                                    전체 삭제
                                </Typo>
                            </Pressable>
                        </Row>
                        <View style={s.emptyWrap}>
                            <Typo
                                size={14}
                                weight={TypoWeight.Regular}
                                color="onSurfaceVariant"
                                textAlign="center"
                            >
                                최근 검색 내역이 없습니다.
                            </Typo>
                        </View>
                    </Column>

                    <Divider />

                    <Column>
                        <Row align="center" style={s.sectionHeader}>
                            <Typo size={16} weight={TypoWeight.Bold} color="onSurface">
                                인기 검색어
                            </Typo>
                        </Row>
                        <Row align="flex-start" style={s.popularGrid}>
                            <Column style={s.popularColumn}>
                                {leftColumn.map((text, idx) => renderRankRow(text, idx + 1))}
                            </Column>
                            <Column style={s.popularColumn}>
                                {rightColumn.map((text, idx) => renderRankRow(text, idx + 6))}
                            </Column>
                        </Row>
                    </Column>
                </ScrollView>
            </SafeAreaView>
            <NavBar>
                <NavBar.Item icon={<Home />} selected={false} screenName="/(tabs)">
                    홈
                </NavBar.Item>
                <NavBar.Item icon={<Search />} selected screenName="/(tabs)/search">
                    검색
                </NavBar.Item>
                <NavBar.Item icon={<User />} selected={false} screenName="/(tabs)/profile">
                    프로필
                </NavBar.Item>
                <NavBar.Item icon={<Settings />} selected={false} screenName="/(tabs)/settings">
                    설정
                </NavBar.Item>
            </NavBar>
        </>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 90,
    },
    header: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBarWrap: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 24,
    },
    sectionHeader: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 12,
    },
    emptyWrap: {
        paddingHorizontal: 20,
        paddingVertical: 32,
    },
    popularGrid: {
        paddingHorizontal: 20,
        paddingBottom: 12,
        gap: 16,
    },
    popularColumn: {
        flex: 1,
    },
    rankRow: {
        height: 44,
    },
    rankNumberWrap: {
        width: 24,
        alignItems: 'center',
    },
    rankKeyword: {
        flex: 1,
    },
});
