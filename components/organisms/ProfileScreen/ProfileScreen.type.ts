import { ReactNode } from 'react';
import { ImageSourcePropType } from 'react-native';

export interface ProfileStat {
    label: string;
    value: number | string;
}

export interface ProfileMenuItem {
    id: string;
    label: string;
    description?: string;
    leadingIcon?: ReactNode;
    trailingText?: string;
    onPress?: () => void;
    destructive?: boolean;
}

export interface ProfileMenuSection {
    title?: string;
    items: ProfileMenuItem[];
}

export interface ProfileScreenProps {
    name: string;
    bio?: string;
    avatarSrc?: ImageSourcePropType;
    stats?: ProfileStat[];
    menuSections?: ProfileMenuSection[];
    onEditProfile?: () => void;
    onShare?: () => void;
}
