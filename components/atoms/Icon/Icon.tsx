import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import {
    Asterisk, Calendar, ChevronLeft, ChevronRight, ChevronDown,
    Clock, X, Check, Search, TriangleAlert, AlertCircle, Info, User,
} from 'lucide-react-native';
import { BrandIcon as BrandIconMap } from '@/components/icon/brand';
import { IconProps, BrandIconProps } from './Icon.type';

export const LucideIconMap = {
    asterisk: Asterisk,
    calender: Calendar,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    chevronDown: ChevronDown,
    clock: Clock,
    close: X,
    check: Check,
    search: Search,
    warning: TriangleAlert,
    error: AlertCircle,
    info: Info,
    user: User,
} as const;

export default function Icon({ name, size = 24, color }: IconProps) {
    const theme = useTheme();
    const Component = LucideIconMap[name];
    return <Component size={size} color={color ?? Color[theme].onSurface} />;
}

function BrandIconComponent({ name, size = 24, color }: BrandIconProps) {
    const theme = useTheme();
    const Component = BrandIconMap[name];
    return <Component size={size} color={color ?? Color[theme].onSurface} />;
}

Icon.Brand = BrandIconComponent;
