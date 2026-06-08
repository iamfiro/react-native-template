import { Asterisk } from 'lucide-react-native';
import { Typo } from '../Typo';
import { LabelProps, LabelSize, LabelStatus } from './Label.type';
import { Row } from '../Row';
import { Color } from '@/constants/color';
import { useTheme } from '@/hooks/useTheme';

export default function Label({
    children,
    essential,
    size = LabelSize.MEDIUM,
    status = LabelStatus.DEFAULT,
}: LabelProps) {
    const theme = useTheme();
    return (
        <Row
            align="center"
            gap={3}
            style={{ opacity: status === LabelStatus.DISABLED ? 0.4 : 1 }}
        >
            <Typo size={size === LabelSize.MEDIUM ? 14 : 12}>{children}</Typo>
            {essential && <Asterisk size={14} color={Color[theme].error} />}
        </Row>
    );
}
