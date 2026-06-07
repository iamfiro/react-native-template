import { ReactNode } from 'react';

export interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode | ((error: Error) => ReactNode);
    onError?: (error: Error, info: { componentStack: string }) => void;
}

export interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}
