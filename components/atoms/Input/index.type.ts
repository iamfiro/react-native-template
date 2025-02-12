import { TextInput, TextInputProps } from "react-native";

export interface InputProps extends TextInputProps {
    error?: string;
    leadingIcon?: React.ReactNode;
}

export type InputRef = TextInput;