export interface SegmentOption {
    label: string;
    value: string;
}

export interface SegmentProps {
    options: SegmentOption[];
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}
