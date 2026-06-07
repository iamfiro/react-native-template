export type FormFieldType =
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'textarea'
    | 'date';

export interface FormFieldValidation {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: (value: string) => string | undefined;
}

export interface FormField extends FormFieldValidation {
    name: string;
    label: string;
    type?: FormFieldType;
    placeholder?: string;
    defaultValue?: string | Date;
    disabled?: boolean;
}

export type FormValues = Record<string, string | Date>;
export type FormErrors = Record<string, string | undefined>;

export interface FormProps {
    fields: FormField[];
    onSubmit: (values: FormValues) => void | Promise<void>;
    submitLabel?: string;
    defaultValues?: FormValues;
    disabled?: boolean;
}
