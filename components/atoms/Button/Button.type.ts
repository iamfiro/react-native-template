import { ComponentPropsFull, WithChildren } from '@/types/components';

export enum ButtonVariant {
    BRAND = 'brand',
    SECONDARY = 'secondary',
    DANGER = 'danger',
    SUCCESS = 'success',
    WARNING = 'warning',
    TEXT = 'text',
}

export enum ButtonSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
}

export interface ButtonActionProps {
    onPress: () => void;
}

export interface ButtonProps
    extends ButtonActionProps,
        WithChildren,
        Pick<ComponentPropsFull, 'fullWidth' | 'fullRadius'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isPending?: boolean;
    disabled?: boolean;
}
