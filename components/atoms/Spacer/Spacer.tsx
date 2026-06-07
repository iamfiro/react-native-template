import { View } from 'react-native';
import { SpacerProps } from './Spacer.type';

export default function Spacer({ size, flex = 1, horizontal = false }: SpacerProps) {
    return (
        <View
            style={{
                flex: size ? undefined : flex,
                width: horizontal ? size : undefined,
                height: !horizontal ? size : undefined,
            }}
        />
    );
}
