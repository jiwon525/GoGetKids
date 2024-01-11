import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screen/LoginScreen';
import HomeScreen from '../screen/HomeScreen';
import AccountScreen from '../screen/AccountScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import footerTab from '../components/TabNav';

const Tab = createBottomTabNavigator();

export default function Nav() {
    return (
        <NavigationContainer>
            <Tab.Navigator tabBar={(props) => <footerTab {...props} />}>
                <Tab.Screen
                    name="Login"
                    component={LoginScreen} />
                <Tab.Screen
                    name="Home"
                    component={HomeScreen} />
                <Tab.Screen
                    name="Home"
                    component={AccountScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
