# React Native Senior Level Code Guidelines

## Project Overview
This is a highly optimized Expo template designed for rapid hackathon development, featuring:

- TypeScript with strict mode enabled
- Atomic Design Pattern
- Theme system with dark/light mode support
- Custom design token system
- Type-safe routing with Expo Router

## Component Architecture

### 1. Atomic Design Structure
components/ 
├── atoms/ # Basic building blocks (Button, Typography, Box) 
├── molecules/ # Combinations of atoms 
└── organisms/ # Complex UI components

### 2. Component File Structure
Each component should follow this structure:

ComponentName/ 
├── ComponentName.tsx # Main component implementation 
├── index.type.ts # TypeScript interfaces and types 
├── index.util.ts # Helper functions and utilities 
└── index.ts # Export file


## Best Practices

### 1. Component Development
- Use functional components with hooks
- Implement proper type safety with TypeScript
- Follow composition over inheritance
- Use proper memo and callback optimization

```tsx
// Good Example
export default function Button({
    variant = ButtonVariant.PRIMARY,
    size = ButtonSize.LARGE,
    isPending,
    disabled,
    onPress,
}: ButtonProps) {
    const theme = useTheme();
    const { scaleAnim, handlePressIn, handlePressOut } = useButtonAnimation();
    // ...
}
```

### 2. Theme System
- Use the theme hook for consistent styling
- Follow the design token system
- Support both light and dark modes

```tsx
// Access theme values
const theme = useTheme(); // Returns 'light' | 'dark'
const styles = {
    color: Color[theme].text,
    backgroundColor: Color[theme].surface
};
```

## 3. Animation Guidelines
- Use Reanimated for complex animations
- Implement shared element transitions
- Use native driver when possible

```tsx
// Animation example
const animation = useRef(new Animated.Value(1)).current;
Animated.spring(animation, {
    toValue: 0.95,
    useNativeDriver: true,
    speed: 100
}).start();
```

### 4. Performance Optimization
Implement proper list rendering optimization
Use proper image caching
Implement proper memory management
Use proper lazy loading

Type Safety
1. Component Props

```tsx
interface ComponentProps extends WithChildren {
    variant?: VariantType;
    size?: SizeType;
}
```

2. Theme Types
```tsx
type ThemeColorType = 'light' | 'dark';
type VariantColorType = keyof typeof Color.light & keyof typeof Color.dark;
```

Testing Guidelines
Implement unit tests for all components
Use proper snapshot testing
Implement proper integration testing
Follow the testing directory structure in tests folder

Build & Development
Use proper environment variables
Follow proper git workflow
Use proper versioning
Implement proper CI/CD

Code Style
Follow proper naming conventions
Use proper code formatting (Prettier)
Follow proper ESLint rules
Use proper TypeScript configuration


This instruction set provides a comprehensive guide for maintaining high-quality code in the React Native project, focusing on type safety, performance, and maintainability.