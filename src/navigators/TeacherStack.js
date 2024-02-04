import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TeacherTab from './TeacherTab';
//screens
import LoginScreen from '../ScreenView/LoginScreen';
import SignupScreen from '../ScreenView/SignupScreen';

const Stack = createStackNavigator();

const TeacherStack = () => {
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
                    component={TeacherTab}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name="SignUp"
                    component={SignupScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default TeacherStack;

