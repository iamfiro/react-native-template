export enum AvatarSize {
    XS = 'xs',
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
    XL = 'xl',
}

export enum AvatarShape {
    CIRCLE = 'circle',
    SQUARE = 'square',
}

import { ImageSourcePropType } from 'react-native';

export interface AvatarProps {
    src?: ImageSourcePropType;
    name?: string;
    size?: AvatarSize;
    shape?: AvatarShape;
    style?: object;
}
