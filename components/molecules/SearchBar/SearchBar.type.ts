export interface SearchBarProps {
    value: string;
    onChange: (text: string) => void;
    onSubmit?: () => void;
    onClear?: () => void;
    placeholder?: string;
    autoFocus?: boolean;
}
