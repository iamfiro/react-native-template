import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { Icon as GlyphIconMap } from '@/components/icon/glyph';
import { BrandIcon as BrandIconMap } from '@/components/icon/brand';
import { IconProps, BrandIconProps } from './Icon.type';

export default function Icon({ name, size = 24, color }: IconProps) {
    const theme = useTheme();
    const Component = GlyphIconMap[name];
    return <Component size={size} color={color ?? Color[theme].text} />;
}

function BrandIconComponent({ name, size = 24, color }: BrandIconProps) {
    const theme = useTheme();
    const Component = BrandIconMap[name];
    return <Component size={size} color={color ?? Color[theme].text} />;
}

Icon.Brand = BrandIconComponent;
