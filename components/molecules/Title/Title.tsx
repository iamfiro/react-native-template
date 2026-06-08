import { Column } from '@/components/atoms/Column';
import { Typo } from '@/components/atoms/Typo';
import { TypoWeight } from '@/components/atoms/Typo/Typo.type';
import { TitleProps } from './Title.type';

export default function Title({ title, description, align = 'left' }: TitleProps) {
    return (
        <Column gap={4}>
            <Typo size={24} weight={TypoWeight.Bold} textAlign={align}>
                {title}
            </Typo>
            {description && (
                <Typo size={14} color="onSurfaceVariant" textAlign={align}>
                    {description}
                </Typo>
            )}
        </Column>
    );
}
