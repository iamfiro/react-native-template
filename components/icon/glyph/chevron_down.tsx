import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SVGProps } from '@/types/components';

const ChevronDown = ({ size = 24, color }: SVGProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <Path
            fill={color}
            d="M6.343 9.996 12.005 15.65l5.654-5.654-1.054-1.053-4.6 4.6-4.6-4.6-1.062 1.053Z"
        />
    </Svg>
);

export default ChevronDown;
