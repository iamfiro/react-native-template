import { Badge, BadgeSize, BadgeVariant } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { ButtonVariant } from '@/components/atoms/Button/Button.type';
import { HStack } from '@/components/atoms/HStack';
import { Input } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';
import { Typo } from '@/components/atoms/Typo';
import { TypoWeight } from '@/components/atoms/Typo/Typo.type';
import { VStack } from '@/components/atoms/VStack';
import { Icon } from '@/components/icon/glyph';
import { NavBar } from '@/components/molecules/NavBar';
import { SocialLogin } from '@/components/molecules/SocialLogin';
import { SocialLoginBrand } from '@/components/molecules/SocialLogin/SocialLogin.type';
import TitleHeader from '@/components/molecules/TitleHeader/TitleHeader';
import { Text, SafeAreaView } from 'react-native';

export default function HomeScreen() {
    return (
        <>
            <SafeAreaView style={{ paddingTop: 40 }}>
                <TitleHeader showBackButton backButtonText="프로필">
                    안녕하세요
                </TitleHeader>
                <HStack style={{ padding: 20 }}>
                    <VStack>
                        <Button
                            variant={ButtonVariant.SUCCESS}
                            onPress={() => {}}
                        >
                            <Text>저장s하기</Text>
                        </Button>
                        <Text style={{ fontFamily: 'PretendardBold' }}>
                            저장s하기
                        </Text>
                        <Text>저장s하기</Text>
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
                    <Label>앙기모찌</Label>
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
                </HStack>
            </SafeAreaView>
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
