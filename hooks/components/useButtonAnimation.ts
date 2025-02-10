import { useRef } from 'react';
import { Animated } from 'react-native';

const useButtonAnimation = () => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.94,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return {
        scaleAnim,
        handlePressIn,
        handlePressOut,
    };
};

export default useButtonAnimation;