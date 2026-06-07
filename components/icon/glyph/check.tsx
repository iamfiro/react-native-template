import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SVGProps } from '@/types/components';

const Check = ({ size = 24, color }: SVGProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M5 12l5 5L19 7"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default Check;
