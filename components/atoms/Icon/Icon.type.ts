import { BrandIcon as BrandIconMap } from '@/components/icon/brand';

export type GlyphIconName =
    | 'asterisk' | 'calender' | 'chevronLeft' | 'chevronRight' | 'chevronDown'
    | 'clock' | 'close' | 'check' | 'search' | 'warning' | 'error' | 'info' | 'user';

export type BrandIconName = keyof typeof BrandIconMap;

export interface IconProps {
    name: GlyphIconName;
    size?: number;
    color?: string;
}

export interface BrandIconProps {
    name: BrandIconName;
    size?: number;
    color?: string;
}
