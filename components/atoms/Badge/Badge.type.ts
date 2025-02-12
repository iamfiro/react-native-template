import { WithChildren } from "@/types/components";

export enum BadgeVariant {
  BRAND = 'Brand',
  SUCCESS = 'Success',
  WARNING = 'Warning',
  DANGER = 'Danger',
}

export enum BadgeSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface BadgeProps extends WithChildren {
  variant?: BadgeVariant;
  size?: BadgeSize;
  outlined?: boolean;
}