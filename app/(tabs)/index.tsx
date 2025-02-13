import {
    Badge,
    BadgeSize,
    BadgeVariant,
    Button,
    ButtonVariant,
    HStack,
    Input,
    Label,
    Skeleton,
    Typo,
    TypoWeight,
    VStack,
} from '@/components/atoms';
import { Icon } from '@/components/icon/glyph';
import {
    NavBar,
    Segment,
    SocialLogin,
    SocialLoginBrand,
    TitleHeader,
} from '@/components/molecules';
import DatePicker from '@/components/organisms/DatePicker/DatePicker';
import React, { useState } from 'react';
import { Text, SafeAreaView } from 'react-native';

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
            <SafeAreaView style={{ paddingTop: 40 }}>
                <TitleHeader showBackButton backButtonText="프로필">
                    안녕하세요
                </TitleHeader>
                <HStack style={{ padding: 20 }}>
                    <VStack>
                        <Button
                            variant={ButtonVariant.BRAND}
                            onPress={() => {}}
                        >
                            <Text>저장s하기</Text>
                        </Button>
                        <Button
                            variant={ButtonVariant.SUCCESS}
                            onPress={() => {}}
                        >
                            <Text>저장s하기</Text>
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
                    </VStack>
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
                        leadingIcon={<Icon.asterisk />}
                    />
                    <HStack gap={10}>
                        <SocialLogin
                            brand={SocialLoginBrand.GOOGLE}
                            onPress={() => {}}
                            border
                        />
                        <SocialLogin
                            brand={SocialLoginBrand.APPLE}
                            onPress={() => {}}
                        />
                    </HStack>
                    <Skeleton width={200} height={24} />
                    <Skeleton width={40} height={40} />
                </HStack>
                <Segment
                    options={options}
                    value={selected}
                    onChange={setSelected}
                />
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
                <NavBar.Item icon={<Icon.asterisk />} selected screenName="..">
                    홈
                </NavBar.Item>
                <NavBar.Item selected={false} screenName="..">
                    홈
                </NavBar.Item>
            </NavBar>
        </>
    );
}
