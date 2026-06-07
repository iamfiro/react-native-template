export interface TabItem {
    label: string;
    value: string;
    badge?: number;
}

export interface TabsProps {
    tabs: TabItem[];
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}
