import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './DriverTab';
//screens
import LoginScreen from '../../app';
import SignupScreen from '../../app/SignupScreen';

const Stack = createStackNavigator();

const DriverStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'transparent'
                    },
                    headerTintColor: 'transparent',
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: 20
                }}
                initialRouteName="Login" >
                <Stack.Screen
                    name="Login"
                    component={LoginScreen} />
                <Stack.Screen
                    name="Home"
                    component={TabNavigator}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name="SignUp"
                    component={SignupScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default DriverStack;

