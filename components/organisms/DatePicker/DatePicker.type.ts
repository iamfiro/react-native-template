import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export interface DatePickerProps {
    value?: Date;
    onChange?: (event: DateTimePickerEvent, date?: Date) => void;
    minimumDate?: Date;
    maximumDate?: Date;
    disabled?: boolean;
}
