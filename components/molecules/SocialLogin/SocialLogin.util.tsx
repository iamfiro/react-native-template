import { ReactNode } from "react";
import { SocialLoginBrand } from "./SocialLogin.type";
import { BrandIcon } from '@/components/icon/brand';
import { VariantColorType } from "@/types/color";

type returnType = {
    icon: ReactNode;
    name: string;
    backgroundColor: string;
    textColor: VariantColorType;
}

export function getSocialBrandDetail(brand: SocialLoginBrand): returnType {
    switch (brand) {
        case SocialLoginBrand.GOOGLE:
            return {
                icon: <BrandIcon.google size={22} />,
                name: 'Google',
                backgroundColor: '#fff',
                textColor: 'text'
            };
        case SocialLoginBrand.APPLE:
            return {
                icon: <BrandIcon.apple color="white" size={22} />,
                name: 'Apple',
                backgroundColor: '#000',
                textColor: 'textInverted'
            };
        default:
            return {
                icon: null,
                name: '(error)',
                backgroundColor: '#fff',
                textColor: 'text'
            };
    }
}