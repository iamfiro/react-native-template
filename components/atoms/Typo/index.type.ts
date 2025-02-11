import { VariantColorType } from "@/types/color";
import { ComponentPropsForTest, WithChildren } from "@/types/components";
import { TextStyle } from "react-native";

export enum TypoWeight {
    Regular = 400,
    Medium = 500,
    SemiBold = 600,
    Bold = 700,
}

export interface TypoStyleProps {
    style?: TextStyle;
    
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'; // 추가: 텍스트 정렬
	numberOfLines?: number; // 추가: 텍스트 표시 줄 수
	ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip'; // 추가: 텍스트가 넘칠 때 처리 방식

    maxWidth?: boolean; // 추가: 텍스트 최대 너비

    color?: VariantColorType;
}

export interface TypoProps extends WithChildren, ComponentPropsForTest, TypoStyleProps {
    size?: number;
    weight?: TypoWeight;
}