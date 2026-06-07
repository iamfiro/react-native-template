import { WithChildren } from '@/types/components';

export interface RadioOption {
    label: string;
    value: string;
}

export interface RadioProps {
    selected: boolean;
    onChange: () => void;
    disabled?: boolean;
    label?: WithChildren['children'];
}

export interface RadioGroupProps {
    options: RadioOption[];
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    direction?: 'row' | 'column';
}
