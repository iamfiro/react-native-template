import { ReactNode } from "react";

export interface ComponentPropsForTest {
    testID?: string;
}

export interface WithChildren {
    children: ReactNode;
}