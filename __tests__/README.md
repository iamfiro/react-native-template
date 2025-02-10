# Test Directory Structure

```
__tests__/
├── components/
│   ├── atoms/
│   │   ├── Button.test.tsx
│   │   └── Text.test.tsx
│   ├── molecules/
│   │   └── Card.test.tsx
│   └── organisms/
│       └── Header.test.tsx
├── screens/
│   ├── Home.test.tsx
│   └── Profile.test.tsx
├── hooks/
│   └── useAuth.test.ts
├── utils/
│   └── helpers.test.ts
└── setup.ts
```

## Naming Convention

- Test files should end with `.test.tsx` or `.test.ts`
- Test files should mirror the source file structure
- Each test file should be placed in the same relative path as its source file

## Test Setup

The `setup.ts` file contains global test configuration and custom matchers.
