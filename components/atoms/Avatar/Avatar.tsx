import { Image, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Color } from '@/constants/color';
import { AvatarProps, AvatarSize, AvatarShape } from './Avatar.type';
import { AVATAR_SIZE_MAP, getInitials } from './Avatar.util';
import { Typo } from '../Typo';

export default function Avatar({
    src,
    name,
    size = AvatarSize.MD,
    shape = AvatarShape.CIRCLE,
    style,
}: AvatarProps) {
    const theme = useTheme();
    const boxSize = AVATAR_SIZE_MAP[size];
    const borderRadius = shape === AvatarShape.CIRCLE ? boxSize / 2 : boxSize * 0.2;
    const fontSize = Math.floor(boxSize * 0.38);

    const containerStyle = {
        width: boxSize,
        height: boxSize,
        borderRadius,
        backgroundColor: Color[theme].primaryContainer,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        overflow: 'hidden' as const,
    };

    if (src) {
        return (
            <View style={[containerStyle, style]}>
                <Image
                    source={{ uri: src }}
                    style={{ width: boxSize, height: boxSize }}
                    resizeMode="cover"
                />
            </View>
        );
    }

    return (
        <View style={[containerStyle, style]}>
            <Typo size={fontSize} color="primary" weight={600}>
                {name ? getInitials(name) : '?'}
            </Typo>
        </View>
    );
}
