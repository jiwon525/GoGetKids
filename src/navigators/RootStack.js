import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
//screens
import LoginScreen from '../ScreenView/LoginScreen';
import SignupScreen from '../ScreenView/SignupScreen';
import { Colors } from '../components/styles'

const Stack = createStackNavigator();

const RootStack = () => {
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

export default RootStack;

