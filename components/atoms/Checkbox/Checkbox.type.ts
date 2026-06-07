import { WithChildren } from '@/types/components';

export enum CheckboxSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
}

export interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    size?: CheckboxSize;
    label?: WithChildren['children'];
}
