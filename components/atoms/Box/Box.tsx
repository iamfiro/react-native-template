import React from 'react';

import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { BoxProps } from './index.type';

export default function Box({
    bgColor,
    direction = 'column',
    justify = 'flex-start',
    align = 'stretch',
    wrap = 'nowrap',
    as,
    ...restProps
}: BoxProps) {
    const style: ViewStyle = {
        backgroundColor: bgColor,
        // Flex를 기본 스타일로 지정
        display: 'flex',
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap,
    };

    const Component = as === 'hoverable' ? TouchableOpacity : View;

    return <Component style={style} {...restProps} />;
}
