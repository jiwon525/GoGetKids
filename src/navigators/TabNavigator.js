// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import UpdateStack from './UpdateStack';
import ChildStack from './ChildStack';
import ScanScreen from '../../app/ScanScreen';
import AccountStack from './AccountStack';
import { UserSessionProvider } from '../../UserSessionContext';
const Tab = createBottomTabNavigator();


const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'transparent',
                },
                headerTintColor: 'transparent',
                headerTransparent: true,
                headerTitle: '',
                headerLeftContainerStyle: 20,
            }}
            initialRouteName="ParentHome"
        >
            <Tab.Screen
                name="ParentHome"
                component={WrapWithUserSessionProvider(ChildStack)}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
                initialParams={{ userId: "tab", accessToken: "root", refreshToken: "" }}
            />
            <Tab.Screen
                name="Updates"
                component={WrapWithUserSessionProvider(UpdateStack)}
                options={{
                    tabBarLabel: 'Schedule',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Scan"
                component={ScanScreen}
                options={{
                    tabBarLabel: 'Scan',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="qr-code" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={WrapWithUserSessionProvider(AccountStack)}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
// Function to wrap a component with UserSessionProvider
const WrapWithUserSessionProvider = (Component) => {
    return () => (
        <UserSessionProvider>
            <Component />
        </UserSessionProvider>
    );
};

export default TabNavigator;
