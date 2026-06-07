import { ReactNode } from 'react';

export interface ModalAction {
    label: string;
    onPress: () => void;
    variant?: 'brand' | 'danger' | 'secondary';
}

export interface ModalProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    children?: ReactNode;
    primaryAction?: ModalAction;
    secondaryAction?: ModalAction;
    closeOnBackdrop?: boolean;
}
