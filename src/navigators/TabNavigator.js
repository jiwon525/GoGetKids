import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainStackNavigator } from './StackNavigator';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AccountScreen from '../Name/AccountScreen';
import HomeScreen from '../Name/HomeScreen';
const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    height: 60
                }
            }}>
            <Tab.Screen name='Home' component={MainStackNavigator}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen name='My Account' component={MainStackNavigator}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="human-greeting-variant" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator
