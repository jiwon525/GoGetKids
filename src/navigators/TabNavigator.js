// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import UpdatesScreen from '../ScreenView/UpdatesScreen';
import ChildStack from './ChildStack';
import ScanScreen from '../ScreenView/ScanScreen';
import AccountStack from './AccountStack';

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
                component={ChildStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
                initialParams={{ userId: "tab", userEmail: "tab", userPW: "" }}
            />
            <Tab.Screen
                name="Updates"
                component={UpdatesScreen}
                options={{
                    tabBarLabel: 'Child',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people" size={size} color={color} />
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
                component={AccountStack}
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

export default TabNavigator;
