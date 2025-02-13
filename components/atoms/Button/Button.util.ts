import { TextStyle, ViewStyle } from 'react-native';
import { ButtonSize, ButtonVariant } from './Button.type';
import { Color } from '@/constants/color';
import { ThemeColorType, VariantColorType } from '@/types/color';

/**
 * 버튼 variant에 따른 색상 스타일을 반환하는 함수
 * 
 * @param variant - 버튼의 변형 타입 (BRAND, SECONDARY, DANGER, SUCCESS, WARNING, TEXT)
 * @param theme - 테마 색상 타입
 * @returns ViewStyle & TextStyle - backgroundColor와 color를 포함한 스타일 객체
 * 
 * @example
 * const buttonStyle = getButtonColorByVariant(ButtonVariant.BRAND, 'light');
 * // returns { backgroundColor: Color.light.brand50, color: Color.light.white }
 * 
 * @remarks
 * - BRAND: 브랜드 색상을 사용하는 기본 버튼
 * - SECONDARY: 회색 계열의 보조 버튼
 * - DANGER: 빨간색 계열의 위험 작업 버튼
 * - SUCCESS: 초록색 계열의 성공 상태 버튼
 * - WARNING: 노란색 계열의 경고 상태 버튼
 * - TEXT: 배경색 없는 텍스트 버튼
 */
export function getButtonColorByVariant(
    variant: ButtonVariant,
    theme: ThemeColorType,
): ViewStyle & TextStyle {
    switch (variant) {
        case ButtonVariant.BRAND:
            return {
                backgroundColor: Color[theme].brand50,
                color: Color[theme].white,
            };
        case ButtonVariant.SECONDARY:
            return {
                backgroundColor: Color[theme].gray20,
                color: Color[theme].text,
            };
        case ButtonVariant.DANGER:
            return {
                backgroundColor: Color[theme].error50,
                color: Color[theme].white,
            };
        case ButtonVariant.SUCCESS:
            return {
                backgroundColor: Color[theme].success50,
                color: Color[theme].white,
            };
        case ButtonVariant.WARNING:
            return {
                backgroundColor: Color[theme].warning50,
                color: Color[theme].black,
            };
        case ButtonVariant.TEXT:
            return {
                backgroundColor: 'transparent',
                color: Color[theme].text,
                padding: 10,
                borderRadius: 5,
            };
        default:
            return {
                backgroundColor: 'blue',
                padding: 10,
                borderRadius: 5,
            };
    }
}

/**
 * 버튼 크기에 따른 스타일을 반환하는 함수
 * 
 * @param size - 버튼 크기 (ButtonSize enum)
 * @returns ViewStyle & TextStyle 객체
 *   - LARGE: 높이 56px, 테두리 반경 14px, 폰트 크기 15px, 가로 패딩 20px
 *   - SMALL: 높이 38px, 테두리 반경 8px, 폰트 크기 12px, 가로 패딩 12px
 *   - default: 높이 30px
 */
export function getButtonStyleByVariant(
    size: ButtonSize,
): ViewStyle & TextStyle {
    switch (size) {
        case ButtonSize.LARGE:
            return {
                height: 56,
                borderRadius: 14,
                fontSize: 15,
                paddingHorizontal: 20,
            };
        case ButtonSize.SMALL:
            return {
                height: 38,
                borderRadius: 8,
                fontSize: 12,
                paddingHorizontal: 12,
            };
        default:
            return {
                height: 30,
            };
    }
}
