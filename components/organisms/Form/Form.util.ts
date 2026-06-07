import { FormField, FormErrors, FormValues } from './Form.type';

export function validateField(field: FormField, value: string | Date): string | undefined {
    const strValue = value instanceof Date ? value.toISOString() : value;

    if (field.required && !strValue.trim()) {
        return `${field.label}을(를) 입력해주세요.`;
    }

    if (typeof strValue === 'string') {
        if (field.minLength && strValue.trim().length < field.minLength) {
            return `${field.label}은(는) 최소 ${field.minLength}자 이상이어야 합니다.`;
        }
        if (field.maxLength && strValue.trim().length > field.maxLength) {
            return `${field.label}은(는) 최대 ${field.maxLength}자까지 입력 가능합니다.`;
        }
        if (field.pattern && !field.pattern.test(strValue)) {
            return `${field.label} 형식이 올바르지 않습니다.`;
        }
        if (field.validate) {
            return field.validate(strValue);
        }
    }

    return undefined;
}

export function validateAll(fields: FormField[], values: FormValues): FormErrors {
    const errors: FormErrors = {};
    for (const field of fields) {
        const value = values[field.name] ?? '';
        const error = validateField(field, value);
        if (error) errors[field.name] = error;
    }
    return errors;
}

export function buildDefaultValues(fields: FormField[], overrides?: FormValues): FormValues {
    const values: FormValues = {};
    for (const field of fields) {
        values[field.name] = overrides?.[field.name] ?? field.defaultValue ?? '';
    }
    return values;
}
