import { WithChildren } from "@/types/components";

export interface TitleHeaderProps extends WithChildren {
    children: string;

    showBackButton?: boolean;
    backButtonText?: string;

    rightContent?: React.ReactNode;
}