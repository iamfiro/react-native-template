import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SVGProps } from '@/types/components';

const ChevronLeft = (props: SVGProps) => (
    <Svg
        width={props.size}
        height={props.size}
        fill={props.color}
        viewBox='0 0 24 24'
        {...props}
    >
        <Path
            fill={props.color}
            d="M14.004 17.657 8.35 12.005l5.654-5.654 1.053 1.054-4.6 4.6 4.6 4.6-1.053 1.053Z"
        />
    </Svg>
);

export default ChevronLeft;
