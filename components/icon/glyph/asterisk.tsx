import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Ref, forwardRef, memo } from 'react';
import { SVGProps } from '@/types/components';

const Asterisk = (props: SVGProps) => (
    <Svg
        width={props.size}
        height={props.size}
        fill={props.color}
        viewBox='0 0 24 24'
        {...props}
    >
        <Path
            fill={props.color}
            d="M11.75 20v-6.696l-4.727 4.742-1.069-1.069 4.742-4.727H4v-1.5h6.696L5.954 6.023l1.069-1.06 4.727 4.743V3h1.5v6.706l4.727-4.742 1.06 1.059-4.743 4.727H21v1.5h-6.706l4.742 4.727-1.059 1.069-4.727-4.742V20h-1.5Z"
        />
    </Svg>
);

export default Asterisk;
