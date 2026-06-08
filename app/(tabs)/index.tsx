import {
    Badge,
    BadgeSize,
    BadgeVariant,
    Button,
    ButtonVariant,
    Column,
    Input,
    Label,
    Row,
    Skeleton,
    Typo,
    TypoWeight,
} from '@/components/atoms';
import { Asterisk, Home, Settings, User, Search, MapPin, Bell, Sparkles, LogIn } from 'lucide-react-native';
import {
    ContentCard,
    ContentCardVariant,
    MediaPreviewHeader,
    NavBar,
    Segment,
    SocialLogin,
    SocialLoginBrand,
    TitleHeader,
} from '@/components/molecules';
import React, { useState } from 'react';
import { Text, SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { DatePicker } from '@/components/organisms';

import Dummy from '@/assets/images/dummy/cat.jpg';

export default function HomeScreen() {
    const options = [
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
    ];
    const [selected, setSelected] = useState('daily');
    const [date, setDate] = useState(new Date());

    return (
        <>
            <SafeAreaView style={{ paddingTop: 40, flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                                <MediaPreviewHeader imageSource={Dummy} />

                <TitleHeader showBackButton backButtonText="프로필">
                    안녕하세요
                </TitleHeader>
                <Column style={{ padding: 20 }}>
                    <Row>
                        <Button
                            variant={ButtonVariant.BRAND}
                            onPress={() => {}}
                        >
                            저장s하기
                        </Button>
                        <Button
                            variant={ButtonVariant.SUCCESS}
                            onPress={() => {}}
                        >
                            저장하기
                        </Button>
                        <Button
                            variant={ButtonVariant.SECONDARY}
                            onPress={() => {}}
                        >
                            <Text>저장s하기</Text>
                        </Button>
                        <Text style={{ fontFamily: 'PretendardBold' }}>
                            저장s하기
                        </Text>
                        <Typo>저장s하기</Typo>
                    </Row>
                    <Typo size={32} weight={TypoWeight.Bold}>
                        아이이
                    </Typo>
                    <Badge
                        variant={BadgeVariant.WARNING}
                        size={BadgeSize.LARGE}
                    >
                        준비 안됨
                    </Badge>
                    <Label essential>앙기모찌</Label>
                    <Input
                        placeholder="아이디"
                        onChange={() => {}}
                        leadingIcon={<Asterisk />}
                    />
                    <Row gap={10}>
                        <SocialLogin
                            brand={SocialLoginBrand.GOOGLE}
                            onPress={() => {}}
                            border
                        />
                        <SocialLogin
                            brand={SocialLoginBrand.APPLE}
                            onPress={() => {}}
                        />
                    </Row>
                    <Skeleton width={200} height={24} />
                    <Skeleton width={40} height={40} />
                </Column>
                <Segment
                    options={options}
                    value={selected}
                    onChange={setSelected}
                />

                <Column style={{ padding: 20, gap: 16 }}>
                    <Typo size={18} weight={TypoWeight.Bold}>
                        ContentCard
                    </Typo>
                    <View style={homeStyles.cardGrid}>
                        <ContentCard variant="elevated" onPress={() => {}} style={homeStyles.gridItem}>
                            <ContentCard.Image source={Dummy} aspectRatio={3 / 2} />
                            <ContentCard.Title>속초 양양</ContentCard.Title>
                            <ContentCard.Description>바다와 산이 만나는 여행지</ContentCard.Description>
                        </ContentCard>
                        <ContentCard variant="elevated" onPress={() => {}} style={homeStyles.gridItem}>
                            <ContentCard.Image source={Dummy} aspectRatio={3 / 2} />
                            <ContentCard.Title>제주도</ContentCard.Title>
                            <ContentCard.Description>이 부분은 설명입니다</ContentCard.Description>
                        </ContentCard>
                    </View>
                    <View style={homeStyles.cardGrid}>
                        <ContentCard variant="flat" onPress={() => {}} style={homeStyles.gridItem}>
                            <ContentCard.Image source={Dummy} aspectRatio={1}>
                                <ContentCard.Badge>삼성전자 공식파트너</ContentCard.Badge>
                            </ContentCard.Image>
                            <ContentCard.Title numberOfLines={2} size={15} weight={TypoWeight.Medium}>
                                삼성전자 43인치 Crystal UHD TV
                            </ContentCard.Title>
                            <ContentCard.Price
                                finalPrice={1076000}
                                originalPrice={1210000}
                            />
                        </ContentCard>
                        <ContentCard variant="flat" onPress={() => {}} style={homeStyles.gridItem}>
                            <ContentCard.Image source={Dummy} aspectRatio={1} />
                            <ContentCard.Title numberOfLines={2} size={15} weight={TypoWeight.Medium}>
                                영광 찐부세 보리굴비 선물세트
                            </ContentCard.Title>
                            <ContentCard.Price finalPrice={176000} />
                        </ContentCard>
                    </View>
                    <ContentCard.Skeleton variant="elevated" />
                    <ContentCard.Skeleton variant="flat" showPrice />
                </Column>

                <Column style={{ padding: 20, gap: 10 }}>
                    <Typo size={18} weight={TypoWeight.Bold}>
                        페이지 템플릿
                    </Typo>
                    <Button
                        variant={ButtonVariant.BRAND}
                        onPress={() => router.push('/(auth)/login')}
                        fullWidth
                    >
                        로그인 (Auth)
                    </Button>
                    <Button
                        variant={ButtonVariant.BRAND}
                        onPress={() => router.push('/(onboarding)')}
                        fullWidth
                    >
                        온보딩
                    </Button>
                    <Button
                        variant={ButtonVariant.BRAND}
                        onPress={() => router.push('/(tabs)/search')}
                        fullWidth
                    >
                        검색
                    </Button>
                    <Button
                        variant={ButtonVariant.BRAND}
                        onPress={() => router.push('/notifications')}
                        fullWidth
                    >
                        알림
                    </Button>
                    <Button
                        variant={ButtonVariant.BRAND}
                        onPress={() => router.push('/(tabs)/map')}
                        fullWidth
                    >
                        지도
                    </Button>
                </Column>
                </ScrollView>
            </SafeAreaView>
            <DatePicker
                value={date}
                onChange={(event, date) => {
                    console.log('index.tsx', { event, date });
                }}
                minimumDate={new Date(2020, 0, 1)}
                maximumDate={new Date(2100, 11, 31)}
            />
            <NavBar>
                <NavBar.Item icon={<Home />} selected screenName="/(tabs)">
                    홈
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

const homeStyles = StyleSheet.create({
    cardGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    gridItem: {
        flex: 1,
    },
});
