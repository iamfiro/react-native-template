export enum SocialLoginBrand {
    GOOGLE = "google",
    APPLE = "apple"
}

export interface SocialLoginProps {
    brand: SocialLoginBrand;
    border?: boolean;
    onPress: () => void;
}