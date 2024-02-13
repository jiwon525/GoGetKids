// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AccountScreen from '../../app/parent/AccountScreen';
import TripScreen from '../../app/TripScreen';
import ScanScreen from '../../app/ScanScreen';
const Tab = createBottomTabNavigator();

const DriverTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'transparent'
                },
                headerTintColor: 'transparent',
                headerTransparent: true,
                headerTitle: '',
                headerLeftContainerStyle: 20
            }}
            initialRouteName="Schedule"
        >
            <Tab.Screen
                name="Schedule"
                component={TripScreen}
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
