import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    Calendar,
    CalendarDays,
    Gift,
    Home,
    Info,
    MessageCircle,
    Settings,
    Trash2,
    Wallet,
    type LucideIcon,
} from 'lucide-react-native';

import { Column } from '@/components/atoms/Column';
import { Divider } from '@/components/atoms/Divider';
import { Pressable } from '@/components/atoms/Pressable';
import { Row } from '@/components/atoms/Row';
import { Typo, TypoWeight } from '@/components/atoms/Typo';
import { TitleHeader } from '@/components/molecules/TitleHeader';
import { Color } from '@/constants/color';
import { useTheme } from '@/hooks/useTheme';
import { formatRelativeTime } from '@/utils/units/time';

const ICON_BG = {
    coral: '#FF8A7A',
    teal: '#2DD4BF',
    sky: '#5BBFF5',
    green: '#4ADE80',
} as const;

const SCREEN_WIDTH = Dimensions.get('window').width;
const DELETE_THRESHOLD = SCREEN_WIDTH * 0.5;

interface NotificationItem {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    iconBgColor: string;
    timestamp: Date;
}

const hoursAgo = (hours: number): Date => {
    const date = new Date();
    date.setHours(date.getHours() - hours);
    return date;
};

const daysAgo = (days: number): Date => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
};

const MOCK_NOTIFICATIONS: NotificationItem[] = [
    {
        id: '1',
        title: '에어팟 맥스 뽑기 이벤트',
        description: '참여만 해도 경품 당첨 기회!',
        icon: Gift,
        iconBgColor: ICON_BG.coral,
        timestamp: hoursAgo(5),
    },
    {
        id: '2',
        title: '오늘의 예산',
        description: '오늘 예산을 초과했어요. 내일은 조금 아껴볼까요?',
        icon: Calendar,
        iconBgColor: ICON_BG.teal,
        timestamp: hoursAgo(11),
    },
    {
        id: '3',
        title: '종잣돈 모으기',
        description: '챌린지에 참여한 234명 중 상위 10%에 들었어요',
        icon: MessageCircle,
        iconBgColor: ICON_BG.sky,
        timestamp: daysAgo(1),
    },
    {
        id: '4',
        title: '오늘의 예산',
        description: '오늘 남은 예산은 12,500원이에요',
        icon: Calendar,
        iconBgColor: ICON_BG.teal,
        timestamp: daysAgo(1),
    },
    {
        id: '5',
        title: '100만원 받은 분도 있어요 🎁',
        description: '대출 쿠폰이 곧 만료돼요. 서둘러 사용하세요!',
        icon: Wallet,
        iconBgColor: ICON_BG.green,
        timestamp: daysAgo(2),
    },
    {
        id: '6',
        title: '주간 지출',
        description: '이번 주 총 지출: 245,300원',
        icon: CalendarDays,
        iconBgColor: ICON_BG.coral,
        timestamp: daysAgo(2),
    },
];

export default function NotificationsScreen() {
    const theme = useTheme();
    const c = Color[theme];
    const insets = useSafeAreaInsets();
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

    const handleDelete = (id: string) => {
        setNotifications((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <View style={[s.container, { backgroundColor: c.surface, paddingTop: insets.top }]}>
            <TitleHeader
                showBackButton
            >
                알림
            </TitleHeader>
            <ScrollView
                contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={s.sectionHeader}>
                    <Typo size={15} weight={TypoWeight.Bold} color="onSurface">
                        최근 7일
                    </Typo>
                </View>

                {notifications.map((item, index) => (
                    <View key={item.id}>
                        <SwipeableNotificationItem
                            notification={item}
                            onDelete={handleDelete}
                        />
                        {index < notifications.length - 1 && (
                            <View style={s.dividerInset}>
                                <Divider />
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

interface SwipeableNotificationItemProps {
    notification: NotificationItem;
    onDelete: (id: string) => void;
}

function SwipeableNotificationItem({
    notification,
    onDelete,
}: SwipeableNotificationItemProps) {
    const theme = useTheme();
    const c = Color[theme];
    const translateX = useSharedValue(0);

    const gesture = Gesture.Pan()
        .activeOffsetX([-10, 10])
        .onUpdate((event) => {
            translateX.value = Math.min(0, event.translationX);
        })
        .onEnd(() => {
            if (Math.abs(translateX.value) > DELETE_THRESHOLD) {
                translateX.value = withSpring(-SCREEN_WIDTH, {}, (finished) => {
                    if (finished) {
                        runOnJS(onDelete)(notification.id);
                    }
                });
                return;
            }
            translateX.value = withSpring(0);
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const Icon = notification.icon;

    return (
        <View style={s.swipeContainer}>
            <Row
                style={[s.deleteBackground, { backgroundColor: c.error }]}
                justify="flex-end"
                align="center"
                gap={6}
            >
                <Trash2 size={20} color={Color.light.onError} />
                <Typo size={13} weight={TypoWeight.Bold} color="onError">
                    삭제
                </Typo>
            </Row>
            <GestureDetector gesture={gesture}>
                <Animated.View style={[animatedStyle, { backgroundColor: c.surface }]}>
                    <Pressable onPress={() => undefined} activeOpacity={0.85}>
                        <Row gap={12} align="flex-start" style={s.item}>
                            <View
                                style={[
                                    s.itemIcon,
                                    { backgroundColor: notification.iconBgColor },
                                ]}
                            >
                                <Icon size={24} color="#FFFFFF" strokeWidth={2.2} />
                            </View>
                            <Column gap={4} style={s.itemContent}>
                                <Row
                                    align="flex-start"
                                    justify="space-between"
                                    gap={8}
                                    fullWidth
                                >
                                    <Typo
                                        size={14}
                                        weight={TypoWeight.SemiBold}
                                        color="onSurface"
                                        numberOfLines={1}
                                        style={s.itemTitle}
                                    >
                                        {notification.title}
                                    </Typo>
                                    <Typo size={12} color="onSurfaceVariant">
                                        {formatRelativeTime(notification.timestamp)}
                                    </Typo>
                                </Row>
                                <Typo
                                    size={14}
                                    color="onSurfaceVariant"
                                    numberOfLines={2}
                                >
                                    {notification.description}
                                </Typo>
                            </Column>
                        </Row>
                    </Pressable>
                </Animated.View>
            </GestureDetector>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionHeader: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 12,
    },
    adBannerWrap: {
        marginHorizontal: 20,
        marginTop: 8,
        marginBottom: 8,
    },
    adBanner: {
        padding: 16,
        borderRadius: 16,
    },
    adIconWrap: {
        width: 48,
        height: 48,
    },
    adIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    adBadge: {
        position: 'absolute',
        top: -4,
        left: -4,
        paddingHorizontal: 5,
        paddingVertical: 1,
        borderRadius: 6,
        borderWidth: 1,
    },
    adText: {
        flex: 1,
    },
    swipeContainer: {
        overflow: 'hidden',
    },
    deleteBackground: {
        ...StyleSheet.absoluteFillObject,
        paddingHorizontal: 24,
    },
    item: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    itemIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContent: {
        flex: 1,
    },
    itemTitle: {
        flex: 1,
    },
    dividerInset: {
        paddingLeft: 76,
    },
});
