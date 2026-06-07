import { Component, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.type';

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: { componentStack: string }) {
        this.props.onError?.(error, info);
    }

    render() {
        const { hasError, error } = this.state;
        const { children, fallback } = this.props;

        if (hasError && error) {
            if (typeof fallback === 'function') return fallback(error);
            if (fallback) return fallback;

            return <DefaultFallback error={error} />;
        }

        return children;
    }
}

function DefaultFallback({ error }: { error: Error }): ReactNode {
    return (
        <View style={fs.container}>
            <Text style={fs.title}>오류가 발생했습니다</Text>
            <Text style={fs.message}>{error.message}</Text>
        </View>
    );
}

const fs = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        gap: 8,
    },
    title: {
        fontSize: 17,
        fontWeight: '600',
    },
    message: {
        fontSize: 13,
        color: '#71717a',
        textAlign: 'center',
    },
});
