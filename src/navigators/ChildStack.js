import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../ScreenView/AccountScreen';
import ChildScreen from '../ScreenView/ChangePasswordScreen';

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
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Child" component={ChildScreen} />
    </Stack.Navigator>
);

export default AccountStackNavigator;
