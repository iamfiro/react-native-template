import { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { BottomSheetProps } from './BottomSheet.type';
import { Typo } from '@/components/atoms/Typo';
import { Icon } from '@/components/atoms/Icon';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function BottomSheet({
    visible,
    onClose,
    title,
    children,
    snapHeight = 'auto',
}: BottomSheetProps) {
    const theme = useTheme();
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.spring(translateY, {
                    toValue: 0,
                    useNativeDriver: true,
                    bounciness: 0,
                    speed: 20,
                }),
                Animated.timing(backdropOpacity, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: SCREEN_HEIGHT,
                    duration: 220,
                    useNativeDriver: true,
                }),
                Animated.timing(backdropOpacity, {
                    toValue: 0,
                    duration: 220,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);

    return (
        <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
            <View style={s.wrapper}>
                <Animated.View style={[s.backdrop, { opacity: backdropOpacity }]}>
                    <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} activeOpacity={1} />
                </Animated.View>

                <Animated.View
                    style={[
                        s.sheet,
                        {
                            backgroundColor: Color[theme].surface,
                            height: snapHeight === 'auto' ? undefined : snapHeight,
                            transform: [{ translateY }],
                        },
                    ]}
                >
                    <View style={s.handle} />

                    {title && (
                        <View style={[s.header, { borderBottomColor: Color[theme].border }]}>
                            <Typo size={16} weight={600} color="text">
                                {title}
                            </Typo>
                            <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                                <Icon name="close" size={22} color={Color[theme].textSecondary} />
                            </TouchableOpacity>
                        </View>
                    )}

                    <View style={[s.content, { paddingBottom: Platform.OS === 'ios' ? 34 : 16 }]}>
                        {children}
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}

const s = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    sheet: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 8,
        maxHeight: SCREEN_HEIGHT * 0.9,
    },
    handle: {
        width: 36,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'rgba(0,0,0,0.15)',
        alignSelf: 'center',
        marginBottom: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderBottomWidth: 1,
    },
    content: {
        padding: 20,
    },
});
