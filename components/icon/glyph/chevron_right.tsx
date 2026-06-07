import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SVGProps } from '@/types/components';

const ChevronRight = ({ size = 24, color }: SVGProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <Path
            fill={color}
            d="M9.996 17.657 15.65 12.005 9.996 6.351 8.943 7.405l4.6 4.6-4.6 4.6 1.053 1.053Z"
        />
    </Svg>
);

export default ChevronRight;
