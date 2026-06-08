import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface SettingsMenuItem {
    type?: 'item';
    id: string;
    label: string;
    description?: string;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    trailingText?: string;
    onPress?: () => void;
    disabled?: boolean;
    destructive?: boolean;
}

export interface SettingsCustomItem {
    type: 'custom';
    id: string;
    render: ReactNode;
}

export type SettingsItem = SettingsMenuItem | SettingsCustomItem;

export interface SettingsSection {
    title?: string;
    footer?: string;
    items: SettingsItem[];
    style?: ViewStyle;
}

export interface SettingsScreenProps {
    sections: SettingsSection[];
    header?: ReactNode;
}
