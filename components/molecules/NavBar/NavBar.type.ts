import { WithChildren } from "@/types/components";
import { Href } from "expo-router";

export interface NavBarItemProps extends WithChildren {
    icon?: React.ReactNode;
    selected: boolean;
    screenName: Href;
}