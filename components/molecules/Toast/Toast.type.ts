export enum ToastVariant {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
}

export interface ToastProps {
    message: string;
    variant?: ToastVariant;
    visible: boolean;
    duration?: number;
    onHide?: () => void;
}
