import { WithChildren } from "@/types/components";

export enum ButtonVariant {
    PRIMARY = 'PRIMARY',
    SECONDARY = 'SECONDARY',
    DANGER = 'DANGER',
    SUCCESS = 'SUCCESS',
    WARNING = 'WARNING',
    TEXT = 'TEXT'
}

export enum ButtonSize {
    SMALL = 'SMALL',
    LARGE = 'LARGE'
}

export interface ButtonActionProps {
    onPress: () => void;
}

export interface ButtonProps extends ButtonActionProps, WithChildren {
    variant?: ButtonVariant;
    size?: ButtonSize;

    isPending?: boolean;
    
    disabled?: boolean;
}