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

export interface AvatarProps {
    src?: string;
    name?: string;
    size?: AvatarSize;
    shape?: AvatarShape;
    style?: object;
}
