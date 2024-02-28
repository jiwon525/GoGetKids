import { Tabs } from 'expo-router/tabs';
import { Ionicons } from '@expo/vector-icons';

export default () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="ScanScreen"
                options={{
                    tabBarLabel: 'Scan',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="qr-code" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="AccountScreen"
                options={{
                    tabBarLabel: 'Account',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="ChangePasswordScreen"
                options={{
                    headerShown: false,
                    href: null,
                }}
            />
        </Tabs>
    );
};

