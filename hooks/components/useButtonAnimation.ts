import { useRef } from 'react';
import { Animated } from 'react-native';

const useButtonAnimation = () => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
            speed: 100    // 애니메이션 속도 증가
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            speed: 100
        }).start();
    }

    return {
        scaleAnim,
        handlePressIn,
        handlePressOut,
    };
};

export default useButtonAnimation;