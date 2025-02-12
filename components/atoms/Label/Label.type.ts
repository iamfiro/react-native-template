import { WithChildren } from "@/types/components";

export enum LabelSize {
    SMALL = 'small',
    MEDIUM = 'medium',
}

export enum LabelStatus {
    DEFAULT = 'default',
    DISABLED = 'disabled',
}

export interface LabelProps extends WithChildren {
    essential?: boolean;
    size?: LabelSize;
    status?: LabelStatus;
}