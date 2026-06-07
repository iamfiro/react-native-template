import { ReactNode } from 'react';

export interface EmptyStateAction {
    label: string;
    onPress: () => void;
}

export interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: EmptyStateAction;
}
