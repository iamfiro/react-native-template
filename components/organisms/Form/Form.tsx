import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { FormProps, FormValues, FormErrors, FormFieldType } from './Form.type';
import { validateAll, validateField, buildDefaultValues } from './Form.util';
import { Input } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';
import { LabelStatus } from '@/components/atoms/Label/Label.type';
import { Typo } from '@/components/atoms/Typo';
import { Button, ButtonVariant, ButtonSize } from '@/components/atoms/Button';
import { DatePicker } from '@/components/organisms/DatePicker';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const KEYBOARD_TYPE: Partial<Record<FormFieldType, 'default' | 'email-address' | 'numeric'>> = {
    email: 'email-address',
    number: 'numeric',
};

export default function Form({
    fields,
    onSubmit,
    submitLabel = '확인',
    defaultValues,
    disabled,
}: FormProps) {
    const [values, setValues] = useState<FormValues>(() => buildDefaultValues(fields, defaultValues));
    const [errors, setErrors] = useState<FormErrors>({});
    const [isPending, setIsPending] = useState(false);

    const setValue = (name: string, value: string | Date) => {
        setValues((prev) => ({ ...prev, [name]: value }));
        const field = fields.find((f) => f.name === name);
        if (field && errors[name]) {
            const error = validateField(field, value);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    const handleSubmit = async () => {
        const newErrors = validateAll(fields, values);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setIsPending(true);
        try {
            await onSubmit(values);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <ScrollView
            contentContainerStyle={s.container}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            {fields.map((field) => {
                const value = values[field.name];
                const error = errors[field.name];
                const isDisabled = disabled || field.disabled;

                return (
                    <View key={field.name} style={s.field}>
                        <Label
                            essential={field.required}
                            status={isDisabled ? LabelStatus.DISABLED : LabelStatus.DEFAULT}
                        >
                            {field.label}
                        </Label>

                        {field.type === 'date' ? (
                            <DatePicker
                                value={value instanceof Date ? value : new Date(value || Date.now())}
                                onChange={(_event: DateTimePickerEvent, date?: Date) => {
                                    if (date) setValue(field.name, date);
                                }}
                                disabled={isDisabled}
                                fullWidth
                            />
                        ) : (
                            <Input
                                value={typeof value === 'string' ? value : ''}
                                onChangeText={(text) => setValue(field.name, text)}
                                placeholder={field.placeholder}
                                secureTextEntry={field.type === 'password'}
                                keyboardType={KEYBOARD_TYPE[field.type ?? 'text'] ?? 'default'}
                                multiline={field.type === 'textarea'}
                                numberOfLines={field.type === 'textarea' ? 4 : 1}
                                editable={!isDisabled}
                                autoCapitalize="none"
                                error={error}
                                style={field.type === 'textarea' ? s.textarea : undefined}
                            />
                        )}

                        {error && (
                            <Typo size={12} weight={400} color="textError">
                                {error}
                            </Typo>
                        )}
                    </View>
                );
            })}

            <Button
                variant={ButtonVariant.BRAND}
                size={ButtonSize.LARGE}
                onPress={handleSubmit}
                isPending={isPending}
                disabled={disabled}
                fullWidth
            >
                {submitLabel}
            </Button>
        </ScrollView>
    );
}

const s = StyleSheet.create({
    container: {
        gap: 20,
        paddingBottom: 16,
    },
    field: {
        gap: 6,
    },
    textarea: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: 12,
    },
});
