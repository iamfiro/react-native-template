import { useTheme } from '@/hooks/useTheme';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    display: 'none',
                },
            }}
        >
            <Tabs.Screen name="index" />
        </Tabs>
    );
}
