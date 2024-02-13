import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import { UserSessionProvider } from '../../UserSessionContext'
//screens
import LoginScreen from '../ScreenView/LoginScreen';
import SignupScreen from '../ScreenView/SignupScreen';

const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <NavigationContainer>
            <UserSessionProvider>
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
                        initialParams={{ userId: "root", accessToken: "root", refreshToken: "" }}
                        options={{ headerShown: false }} />
                    <Stack.Screen
                        name="SignUp"
                        component={SignupScreen} />
                </Stack.Navigator>
            </UserSessionProvider>
        </NavigationContainer>
    );
}



export default RootStack;

