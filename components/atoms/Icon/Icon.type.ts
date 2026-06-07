import { Icon as GlyphIconMap } from '@/components/icon/glyph';
import { BrandIcon as BrandIconMap } from '@/components/icon/brand';

export type GlyphIconName = keyof typeof GlyphIconMap;
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
