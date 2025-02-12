import { WithChildren } from "@/types/components";
import { RelativePathString } from "expo-router";

export interface NavBarItemProps extends WithChildren {
    icon?: React.ReactNode;
    selected: boolean;
    screenName: RelativePathString;
}