import { ReactNode } from 'react';

export interface ListItemProps {
    title: string;
    description?: string;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    trailingText?: string;
    onPress?: () => void;
    disabled?: boolean;
    showChevron?: boolean;
}
