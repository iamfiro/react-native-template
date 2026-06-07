import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { SVGProps } from '@/types/components';

const Search = ({ size = 24, color }: SVGProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={2} />
        <Path
            d="M16.5 16.5L21 21"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
        />
    </Svg>
);

export default Search;
