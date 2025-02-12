import { Box } from '../Box';
import { BoxProps } from '../Box/index.type';

export default function HStack({ children, ...restProps }: BoxProps) {
    return (
        <Box direction="column" {...restProps}>
            {children}
        </Box>
    );
}
