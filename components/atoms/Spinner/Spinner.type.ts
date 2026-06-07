export enum SpinnerSize {
    SMALL = 'small',
    LARGE = 'large',
}

export interface SpinnerProps {
    size?: SpinnerSize | number | 'small' | 'large';
    color?: string;
}
