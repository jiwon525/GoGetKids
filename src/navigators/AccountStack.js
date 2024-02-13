// AccountStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../../app/parent/AccountScreen';
import ChangePasswordScreen from '../../app/ChangePasswordScreen';

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
        <Stack.Screen name="AccountScreen" component={AccountScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
);

export default AccountStackNavigator;
