export const Color = {
    light: {
        // Primary
        primary: 'rgb(27, 114, 247)',
        onPrimary: '#FFFFFF',
        primaryContainer: 'rgb(229, 237, 253)',
        onPrimaryContainer: 'rgb(4, 43, 92)',

        // Secondary
        secondary: 'rgb(113, 113, 122)',
        onSecondary: '#FFFFFF',
        secondaryContainer: 'rgb(228, 228, 231)',
        onSecondaryContainer: 'rgb(39, 39, 42)',

        // Tertiary
        tertiary: 'rgb(75, 142, 248)',
        onTertiary: '#FFFFFF',
        tertiaryContainer: 'rgb(194, 214, 251)',
        onTertiaryContainer: 'rgb(6, 59, 133)',

        // Error
        error: 'rgb(220, 49, 33)',
        onError: '#FFFFFF',
        errorContainer: 'rgb(254, 243, 242)',
        onErrorContainer: 'rgb(97, 22, 15)',

        // Success
        success: 'rgb(45, 146, 86)',
        onSuccess: '#FFFFFF',
        successContainer: 'rgb(242, 251, 246)',
        onSuccessContainer: 'rgb(20, 64, 38)',

        // Warning
        warning: 'rgb(234, 157, 19)',
        onWarning: 'rgb(9, 9, 11)',
        warningContainer: 'rgb(255, 249, 240)',
        onWarningContainer: 'rgb(104, 70, 8)',

        // Surface
        surface: '#FFFFFF',
        surfaceDim: 'rgb(228, 228, 231)',
        surfaceBright: '#FFFFFF',
        surfaceContainer: 'rgb(244, 244, 245)',
        surfaceContainerLow: 'rgb(252, 252, 253)',
        surfaceContainerHigh: 'rgb(228, 228, 231)',
        surfaceContainerHighest: 'rgb(212, 212, 216)',
        onSurface: 'rgb(9, 9, 11)',
        onSurfaceVariant: 'rgb(113, 113, 122)',

        // Inverse
        inverseSurface: 'rgb(24, 24, 27)',
        inverseOnSurface: '#FFFFFF',
        inversePrimary: 'rgb(75, 142, 248)',

        // Outline
        outline: 'rgb(161, 161, 170)',
        outlineVariant: 'rgb(228, 228, 231)',

        // Scrim & Shadow
        scrim: 'rgb(9, 9, 11)',
        shadow: 'rgb(9, 9, 11)',

        // Disabled
        disabled: 'rgb(161, 161, 170)',
        onDisabled: 'rgb(113, 113, 122)',
    },
    dark: {
        // Primary
        primary: 'rgb(75, 142, 248)',
        onPrimary: 'rgb(4, 43, 92)',
        primaryContainer: 'rgb(10, 92, 217)',
        onPrimaryContainer: 'rgb(229, 237, 253)',

        // Secondary
        secondary: 'rgb(161, 161, 170)',
        onSecondary: 'rgb(24, 24, 27)',
        secondaryContainer: 'rgb(63, 63, 70)',
        onSecondaryContainer: 'rgb(228, 228, 231)',

        // Tertiary
        tertiary: 'rgb(123, 167, 248)',
        onTertiary: 'rgb(6, 59, 133)',
        tertiaryContainer: 'rgb(8, 76, 175)',
        onTertiaryContainer: 'rgb(194, 214, 251)',

        // Error
        error: 'rgb(231, 77, 63)',
        onError: 'rgb(56, 13, 9)',
        errorContainer: 'rgb(56, 13, 9)',
        onErrorContainer: 'rgb(254, 228, 226)',

        // Success
        success: 'rgb(56, 182, 107)',
        onSuccess: 'rgb(11, 37, 22)',
        successContainer: 'rgb(11, 37, 22)',
        onSuccessContainer: 'rgb(226, 246, 235)',

        // Warning
        warning: 'rgb(246, 178, 51)',
        onWarning: 'rgb(60, 40, 5)',
        warningContainer: 'rgb(60, 40, 5)',
        onWarningContainer: 'rgb(254, 243, 226)',

        // Surface
        surface: 'rgb(24, 24, 27)',
        surfaceDim: 'rgb(9, 9, 11)',
        surfaceBright: 'rgb(63, 63, 70)',
        surfaceContainer: 'rgb(39, 39, 42)',
        surfaceContainerLow: 'rgb(24, 24, 27)',
        surfaceContainerHigh: 'rgb(63, 63, 70)',
        surfaceContainerHighest: 'rgb(82, 82, 91)',
        onSurface: '#FFFFFF',
        onSurfaceVariant: 'rgb(161, 161, 170)',

        // Inverse
        inverseSurface: 'rgb(244, 244, 245)',
        inverseOnSurface: 'rgb(9, 9, 11)',
        inversePrimary: 'rgb(27, 114, 247)',

        // Outline
        outline: 'rgb(82, 82, 91)',
        outlineVariant: 'rgb(63, 63, 70)',

        // Scrim & Shadow
        scrim: 'rgb(9, 9, 11)',
        shadow: 'rgb(9, 9, 11)',

        // Disabled
        disabled: 'rgb(63, 63, 70)',
        onDisabled: 'rgb(82, 82, 91)',
    },
} as const;
