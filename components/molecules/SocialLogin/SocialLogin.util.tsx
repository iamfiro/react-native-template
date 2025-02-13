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

/**
 * 소셜 로그인 브랜드에 따른 UI 세부 정보를 반환합니다.
 * 
 * @param brand - 소셜 로그인 브랜드 (GOOGLE 또는 APPLE)
 * @returns {Object} 브랜드별 UI 구성 요소
 * @returns {ReactNode} returns.icon - 브랜드 아이콘 컴포넌트
 * @returns {string} returns.name - 브랜드 이름
 * @returns {string} returns.backgroundColor - 브랜드 배경색
 * @returns {string} returns.textColor - 브랜드 텍스트 색상
 * 
 * @example
 * const googleBrandDetail = getSocialBrandDetail(SocialLoginBrand.GOOGLE);
 * // returns { icon: <GoogleIcon />, name: 'Google', backgroundColor: '#fff', textColor: 'black' }
 */
export function getSocialBrandDetail(brand: SocialLoginBrand): returnType {
    switch (brand) {
        case SocialLoginBrand.GOOGLE:
            return {
                icon: <BrandIcon.google size={22} />,
                name: 'Google',
                backgroundColor: '#fff',
                textColor: 'black'
            };
        case SocialLoginBrand.APPLE:
            return {
                icon: <BrandIcon.apple color="white" size={22} />,
                name: 'Apple',
                backgroundColor: '#000',
                textColor: 'white'
            };
        default:
            return {
                icon: null,
                name: '(error)',
                backgroundColor: '#fff',
                textColor: 'black'
            };
    }
}