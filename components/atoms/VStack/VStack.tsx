import { Box } from '../Box';
import { BoxProps } from '../Box/index.type';

export default function VStack({ children, ...restProps }: BoxProps) {
    return (
        <Box direction="column" {...restProps}>
            {children}
        </Box>
    );
}
