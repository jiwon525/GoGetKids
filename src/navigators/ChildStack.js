import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../ScreenView/HomeScreen';
import ScheduleScreen from '../ScreenView/ScheduleScreen';

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
    </Stack.Navigator>
);

export default ChildStack;
