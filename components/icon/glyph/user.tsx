import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { SVGProps } from '@/types/components';

const User = ({ size = 24, color }: SVGProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={2} />
        <Path
            d="M4 20c0-4 3.582-7 8-7s8 3 8 7"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
        />
    </Svg>
);

export default User;
