import { WithChildren } from "@/types/components";

export enum BadgeVariant {
  PRIMARY = 'primary',
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
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