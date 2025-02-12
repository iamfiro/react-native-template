import { Icon } from '@/components/icon/glyph';
import { Typo } from '../Typo';
import { LabelProps, LabelSize, LabelStatus } from './index.type';
import { VStack } from '../VStack';
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
        <VStack
            align="center"
            gap={3}
            style={{ opacity: status === LabelStatus.DISABLED ? 0.4 : 1 }}
        >
            <Typo size={size === LabelSize.MEDIUM ? 14 : 12}>{children}</Typo>
            {essential && <Icon.asterisk size={14} color={'#E74D3F'} />}
        </VStack>
    );
}
