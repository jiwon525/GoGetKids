// AccountStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../ScreenView/AccountScreen';
import ChangePasswordScreen from '../ScreenView/ChangePasswordScreen';

const Stack = createStackNavigator();

const AccountStackNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: 'transparent',
            },
            headerTintColor: 'transparent',
            headerTransparent: true,
            headerTitle: '',
            headerLeftContainerStyle: 20,
        }}
    >
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
);

export default AccountStackNavigator;
