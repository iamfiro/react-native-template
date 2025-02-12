import { ReactNode } from "react";

export interface ComponentPropsForTest {
    testID?: string;
}

export interface WithChildren {
    children: ReactNode;
}

export interface SVGProps {
    size?: number;
    color?: string;
}