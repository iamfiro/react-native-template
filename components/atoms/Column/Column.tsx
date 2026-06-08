import { Box } from '../Box';
import { BoxProps } from '../Box/Box.type';

export default function Column({ children, ...restProps }: BoxProps) {
    return (
        <Box direction="column" {...restProps}>
            {children}
        </Box>
    );
}
