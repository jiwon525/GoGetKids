// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AccountScreen from '../ScreenView/AccountScreen';
import ScheduleScreen from '../ScreenView/ScheduleScreen';
import ScanScreen from '../ScreenView/ScanScreen';

const Tab = createBottomTabNavigator();


const DriverTab = () => {
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
            initialRouteName="Home"
        >
            <Tab.Screen
                name="Schedule"
                component={ScheduleScreen}
                options={{
                    tabBarLabel: 'Trip',
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
                component={AccountScreen}
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

export default DriverTab;
