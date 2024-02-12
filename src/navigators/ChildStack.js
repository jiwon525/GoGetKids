import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../ScreenView/HomeScreen';
import ScheduleScreen from '../ScreenView/ScheduleScreen';
import AssignGuardian from '../ScreenView/AssignGuardian';
import GenerateQR from '../ScreenView/GenerateQR';

const Stack = createStackNavigator();

const ChildStack = () => (
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
        <Stack.Screen name="Child" component={ScheduleScreen} />
        <Stack.Screen name="Assign" component={AssignGuardian} />
        <Stack.Screen name="GenerateQR" component={GenerateQR} />
    </Stack.Navigator>
);

export default ChildStack;
