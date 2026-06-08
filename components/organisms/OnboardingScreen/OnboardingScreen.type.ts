import { ImageSourcePropType } from 'react-native';
import { ReactNode } from 'react';

export type OnboardingAction =
    | { type: 'button'; label: string; onPress: () => void }
    | { type: 'google'; onPress: () => void }
    | { type: 'apple'; onPress: () => void }
    | { type: 'email'; label?: string; onPress: () => void }
    | { type: 'custom'; node: ReactNode };

export interface OnboardingScreenProps {
    backgroundImage: ImageSourcePropType;
    title: string;
    description?: string;
    actions: OnboardingAction[];
}
