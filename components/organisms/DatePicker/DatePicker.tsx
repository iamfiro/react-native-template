import DateTimePicker from '@react-native-community/datetimepicker';
import { DatePickerProps } from './DatePicker.type';
import { useTheme } from '@/hooks/useTheme';
import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    ButtonSize,
    ButtonVariant,
    Typo,
    VStack,
} from '@/components/atoms';
import {
    Platform,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Color } from '@/constants/color';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Icon } from '@/components/icon/glyph';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function DatePicker({
    value = new Date(),
    onChange,
    minimumDate,
    maximumDate,
    disabled,
    fullWidth,
    fullRadius,
}: DatePickerProps) {
    const theme = useTheme();
    const [show, setShow] = useState(false);
    const [modalHeight, setModalHeight] = useState(0);
    const [selectedDate, setSelectedDate] = useState<Date>(value);

    // 날짜를 포맷팅하는 함수
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handlePress = () => {
        if (disabled) return;
        setSelectedDate(value);
        setShow(true);
    };

    const updateDate = (newDate: Date) => {
        if (!isValidDate(newDate)) return;

        setSelectedDate(newDate);

        // value 업데이트
        value.setTime(newDate.getTime());

        // onChange 콜백 호출
        if (onChange) {
            const event: DateTimePickerEvent = {
                type: 'set',
                nativeEvent: {
                    timestamp: newDate.getTime(),
                    utcOffset: newDate.getTimezoneOffset(),
                },
            };
            onChange(event, newDate);
        }
    };

    // 안드로이드용 onChange 핸들러
    const handleAndroidChange = (event: DateTimePickerEvent, date?: Date) => {
        setShow(false);
        if (event.type === 'dismissed' || !date) return;
        updateDate(date);
    };

    // iOS용 onChange 핸들러
    const handleIOSChange = (event: DateTimePickerEvent, date?: Date) => {
        console.log(date);
        if (!date) return;
        setSelectedDate(date);
    };

    const handleIOSConfirm = () => {
        setShow(false);
        updateDate(selectedDate);
    };

    const isValidDate = (date: Date): boolean => {
        if (minimumDate && date < minimumDate) return false;
        if (maximumDate && date > maximumDate) return false;
        return true;
    };

    return (
        <VStack>
            <VStack
                as="hoverable"
                onPress={handlePress}
                disabled={disabled}
                align="center"
                gap={8}
                style={[
                    s.container,
                    {
                        borderColor: show
                            ? Color[theme].borderBrand
                            : Color[theme].border,
                        borderWidth: show ? 2 : 1,
                        opacity: disabled ? 0.5 : 1,
                        backgroundColor: Color[theme].surface,
                        width: fullWidth ? '100%' : 'auto',
                        borderRadius: fullRadius ? 999 : 16,
                    },
                ]}
            >
                <Icon.calender size={24} color={Color[theme].textSecondary} />
                <Typo
                    size={15}
                    color={disabled ? 'textDisabled' : 'text'}
                    weight={400}
                >
                    {formatDate(value)}
                </Typo>
            </VStack>

            {/* DatePicker */}
            {show && (
                <>
                    {Platform.OS === 'android' ? (
                        <DateTimePicker
                            value={selectedDate}
                            onChange={handleAndroidChange}
                            minimumDate={minimumDate}
                            maximumDate={maximumDate}
                            mode="date"
                        />
                    ) : (
                        <>
                            <TouchableOpacity
                                style={s.backdrop}
                                activeOpacity={1}
                                onPress={() => setShow(false)}
                            />
                            <Box
                                style={[
                                    s.iosPickerContainer,
                                    {
                                        backgroundColor: Color[theme].surface,
                                        borderColor: Color[theme].border,
                                        top:
                                            -SCREEN_HEIGHT / 2 +
                                            modalHeight / 5,
                                    },
                                ]}
                                align="center"
                                justify="center"
                                gap={12}
                                onLayout={(e) =>
                                    setModalHeight(e.nativeEvent.layout.height)
                                }
                            >
                                <DateTimePicker
                                    value={selectedDate}
                                    onChange={(event, date) => {
                                        if (Platform.OS === 'ios') {
                                            handleIOSChange(event, date);
                                        } else {
                                            handleAndroidChange(event, date);
                                        }
                                    }}
                                    minimumDate={minimumDate}
                                    maximumDate={maximumDate}
                                    mode="date"
                                    display="inline"
                                    themeVariant={theme}
                                />
                                <Button
                                    variant={ButtonVariant.BRAND}
                                    size={ButtonSize.MEDIUM}
                                    onPress={handleIOSConfirm}
                                    fullWidth
                                >
                                    <Typo size={16} color="white">
                                        확인
                                    </Typo>
                                </Button>
                                <Button
                                    variant={ButtonVariant.SECONDARY}
                                    size={ButtonSize.MEDIUM}
                                    fullWidth
                                    onPress={() => setShow(false)}
                                >
                                    <Typo size={16} color="white">
                                        닫기
                                    </Typo>
                                </Button>
                            </Box>
                        </>
                    )}
                </>
            )}
        </VStack>
    );
}

const s = StyleSheet.create({
    container: {
        height: 56,
        borderRadius: 16,
        paddingHorizontal: 14,
        justifyContent: 'center',
    },
    backdrop: {
        position: 'absolute',
        top: -SCREEN_HEIGHT,
        left: -SCREEN_WIDTH,
        right: -SCREEN_WIDTH,
        bottom: -SCREEN_HEIGHT,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 100,
    },
    iosPickerContainer: {
        padding: 10,
        paddingTop: 0,

        borderRadius: 22,
        borderWidth: 1,

        position: 'absolute',
        left: 20,
        right: 20,
        zIndex: 101,
    },
});
