import { WithChildren } from '@/types/components';

export interface SwitchProps {
    value: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
    label?: WithChildren['children'];
}
