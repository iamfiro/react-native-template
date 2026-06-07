import { AvatarSize } from './Avatar.type';

export const AVATAR_SIZE_MAP: Record<AvatarSize, number> = {
    [AvatarSize.XS]: 24,
    [AvatarSize.SM]: 32,
    [AvatarSize.MD]: 40,
    [AvatarSize.LG]: 56,
    [AvatarSize.XL]: 72,
};

export function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}
