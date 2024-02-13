import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../ScreenView/HomeScreen';
import ScheduleScreen from '../ScreenView/ScheduleScreen';
import AssignGuardian from '../ScreenView/AssignGuardian';

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
        <Stack.Screen name="HomeScreen"
            component={HomeScreen}
            initialParams={{ userId: "child", accessToken: "root", refreshToken: "" }} />
        <Stack.Screen name="Child" component={ScheduleScreen} />
        <Stack.Screen name="Assign" component={AssignGuardian} />
    </Stack.Navigator>
);

export default ChildStack;
