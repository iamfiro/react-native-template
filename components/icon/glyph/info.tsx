import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { SVGProps } from '@/types/components';

const Info = ({ size = 24, color }: SVGProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} />
        <Path d="M12 16v-4M12 8h.01" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
);

export default Info;
