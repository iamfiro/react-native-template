import { WithChildren } from '@/types/components';

export interface BottomSheetProps extends WithChildren {
    visible: boolean;
    onClose: () => void;
    title?: string;
    snapHeight?: number | 'auto';
}
