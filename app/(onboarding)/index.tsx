import { Row } from '@/components/atoms/Row';
import { Spacer } from '@/components/atoms/Spacer';
import { Typo, TypoWeight } from '@/components/atoms/Typo';
import { Color } from '@/constants/color';
import { useTheme } from '@/hooks/useTheme';
import { Bell, MapPin, Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    ListRenderItem,
    Pressable,
    StyleSheet,
    View,
    ViewToken,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ONBOARDING_STEPS = [
    {
        id: 'welcome',
        Icon: MapPin,
        title: '새로운 시작을\n환영해요',
        description:
            '필요한 기능을 한곳에 담은 템플릿으로\n더 빠르고 편하게 앱을 만들어보세요.',
    },
    {
        id: 'features',
        Icon: Search,
        title: '핵심 기능을\n쉽게 찾아요',
        description:
            '정리된 컴포넌트와 라우팅 구조로 원하는\n화면과 기능을 빠르게 탐색할 수 있어요.',
    },
    {
        id: 'start',
        Icon: Bell,
        title: '이제 바로\n시작해요',
        description:
            '준비된 기반 위에서 나만의 서비스를 만들고\n사용자에게 멋진 경험을 전달해보세요.',
    },
] as const;

type OnboardingStep = (typeof ONBOARDING_STEPS)[number];

export default function OnboardingPage() {
    const router = useRouter();
    const theme = useTheme();
    const c = Color[theme];
    const insets = useSafeAreaInsets();
    const listRef = useRef<FlatList<OnboardingStep>>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 60 });

    const isFinalStep = currentIndex === ONBOARDING_STEPS.length - 1;

    const handleStart = useCallback(() => {
        router.replace('/(tabs)');
    }, [router]);

    const handleContinue = useCallback(() => {
        if (isFinalStep) {
            handleStart();
            return;
        }

        const nextIndex = currentIndex + 1;
        listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        setCurrentIndex(nextIndex);
    }, [currentIndex, handleStart, isFinalStep]);

    const handleViewableItemsChanged = useRef(
        ({ viewableItems }: { viewableItems: ViewToken<OnboardingStep>[] }) => {
            const nextIndex = viewableItems[0]?.index;

            if (typeof nextIndex === 'number') {
                setCurrentIndex(nextIndex);
            }
        },
    );

    const renderStep: ListRenderItem<OnboardingStep> = ({ item }) => {
        const Icon = item.Icon;

        return (
            <View style={s.slide}>
                <View style={s.iconArea}>
                    <View
                        style={[
                            s.iconHalo,
                            { backgroundColor: c.surfaceContainer },
                        ]}
                    />
                    <View
                        style={[
                            s.iconContainer,
                            {
                                backgroundColor: c.surfaceContainerHigh,
                                borderColor: c.outlineVariant,
                            },
                        ]}
                    >
                        <Icon color={c.primary} size={88} strokeWidth={1.6} />
                    </View>
                </View>
                <View style={s.textArea}>
                    <Typo
                        size={32}
                        weight={TypoWeight.Bold}
                        color="onSurface"
                        textAlign="left"
                        style={s.title}
                    >
                        {item.title}
                    </Typo>
                    <Spacer size={12} />
                    <Typo
                        size={16}
                        weight={TypoWeight.Medium}
                        color="onSurfaceVariant"
                        textAlign="left"
                        style={s.description}
                    >
                        {item.description}
                    </Typo>
                </View>
            </View>
        );
    };

    const ctaLabel = useMemo(
        () => (isFinalStep ? '시작하기' : '계속'),
        [isFinalStep],
    );

    return (
        <View style={[s.container, { backgroundColor: c.surface }]}>
            <View style={[s.header, { paddingTop: insets.top + 12 }]}>
                {!isFinalStep ? (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="온보딩 건너뛰기"
                        hitSlop={12}
                        onPress={handleStart}
                        style={({ pressed }) => [
                            s.skipButton,
                            { opacity: pressed ? 0.6 : 1 },
                        ]}
                    >
                        <Row align="center" gap={2}>
                            <Typo
                                size={15}
                                weight={TypoWeight.SemiBold}
                                color="onSurfaceVariant"
                            >
                                건너뛰기
                            </Typo>
                            <Typo
                                size={15}
                                weight={TypoWeight.SemiBold}
                                color="onSurfaceVariant"
                            >
                                {' >'}
                            </Typo>
                        </Row>
                    </Pressable>
                ) : null}
            </View>

            <FlatList
                ref={listRef}
                data={ONBOARDING_STEPS}
                horizontal
                keyExtractor={(item) => item.id}
                onViewableItemsChanged={handleViewableItemsChanged.current}
                pagingEnabled
                renderItem={renderStep}
                showsHorizontalScrollIndicator={false}
                snapToInterval={SCREEN_WIDTH}
                viewabilityConfig={viewabilityConfig.current}
                style={s.carousel}
            />

            <View
                style={[
                    s.bottom,
                    { paddingBottom: insets.bottom + 20 },
                ]}
            >
                <Row align="center" justify="center" gap={6} style={s.dots}>
                    {ONBOARDING_STEPS.map((step, index) => {
                        const active = currentIndex === index;
                        return (
                            <View
                                key={step.id}
                                style={[
                                    s.dot,
                                    {
                                        backgroundColor: active
                                            ? c.primary
                                            : c.outlineVariant,
                                        width: active ? 22 : 8,
                                    },
                                ]}
                            />
                        );
                    })}
                </Row>
                <Spacer size={28} />
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={ctaLabel}
                    onPress={handleContinue}
                    style={({ pressed }) => [
                        s.cta,
                        {
                            backgroundColor: c.inverseSurface,
                            opacity: pressed ? 0.85 : 1,
                        },
                    ]}
                >
                    <Typo
                        size={17}
                        weight={TypoWeight.Bold}
                        color="inverseOnSurface"
                        textAlign="center"
                        style={s.ctaLabel}
                    >
                        {ctaLabel}
                    </Typo>
                </Pressable>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'flex-end',
        left: 0,
        paddingHorizontal: 20,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 2,
    },
    skipButton: {
        paddingHorizontal: 6,
        paddingVertical: 8,
    },
    carousel: {
        flex: 1,
    },
    slide: {
        flex: 1,
        paddingHorizontal: 24,
        width: SCREEN_WIDTH,
    },
    iconArea: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        position: 'relative',
    },
    iconHalo: {
        borderRadius: 999,
        height: 240,
        opacity: 0.55,
        position: 'absolute',
        width: 240,
    },
    iconContainer: {
        alignItems: 'center',
        borderRadius: 44,
        borderWidth: StyleSheet.hairlineWidth,
        height: 144,
        justifyContent: 'center',
        width: 144,
    },
    textArea: {
        justifyContent: 'flex-end',
        paddingBottom: 16,
    },
    title: {
        fontFamily: 'PretendardBold',
        letterSpacing: -0.5,
        lineHeight: 40,
    },
    description: {
        fontFamily: 'PretendardMedium',
        lineHeight: 24,
        maxWidth: 360,
    },
    bottom: {
        paddingHorizontal: 24,
        paddingTop: 8,
    },
    dots: {
        minHeight: 16,
    },
    dot: {
        borderRadius: 999,
        height: 8,
    },
    cta: {
        alignItems: 'center',
        borderRadius: 999,
        height: 56,
        justifyContent: 'center',
        width: '100%',
    },
    ctaLabel: {
        fontFamily: 'PretendardBold',
    },
});
