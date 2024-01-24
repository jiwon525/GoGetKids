import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
//screens
import AccountScreen from '../ScreenView/AccountScreen';
import HomeScreen from '../ScreenView/HomeScreen';
import LoginScreen from '../ScreenView/LoginScreen';
import ScanScreen from '../ScreenView/ScanScreen';
import SignupScreen from '../ScreenView/SignupScreen';
import ChildScreen from '../ScreenView/ChildScreen';
import DbTest from '../ScreenView/DbTestScreen';
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
                    headerTintColor: Colors.primary,
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

