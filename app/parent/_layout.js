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
                name="UpdatesScreen"
                options={{
                    tabBarLabel: 'Schedule',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar-outline" size={size} color={color} />
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
                name="AssignGuardian"
                options={{
                    headerShown: false,
                    href: null,
                }}
            />
            <Tabs.Screen
                name="ScheduleScreen"
                options={{
                    headerShown: false,
                    href: null,
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

/**
 example of passing params
 <Tabs.Screen
                // Name of the dynamic route.
                name="[user]"
                options={{
                    // Ensure the Tabs always links to the same href.
                    href: '/evanbacon',
                    // OR you can use the Href object:
                    href: {
                        pathname: '/[user]',
                        params: {
                            user: 'evanbacon',
                        },
                    },
                }}
            />
 */