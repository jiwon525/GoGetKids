import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UpdatesScreen from '../ScreenView/UpdatesScreen';
import AssignGuardian from '../ScreenView/AssignGuardian';

const Stack = createStackNavigator();

const UpdateStack = () => (
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
        <Stack.Screen name="Schedule"
            component={UpdatesScreen} />
        <Stack.Screen name="Assign" component={AssignGuardian} />
    </Stack.Navigator>
);

export default UpdateStack;
