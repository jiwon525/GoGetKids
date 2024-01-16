import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Name/HomeScreen';
import AccountScreen from '../Name/AccountScreen';

const Stack = createStackNavigator()

const MainStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='homescreen'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#91c4f8"
                },
                headerShown: false
            }}
        >
            <Stack.Screen name='homescreen' component={HomeScreen} />
            <Stack.Screen name='accountscreen' component={AccountScreen} />
        </Stack.Navigator>
    )
}
/*
const CartStackNavigator = () => {
   return( <Stack.Navigator
    initialRouteName='cart-screen'
    screenOptions={{
        headerStyle:{
            backgroundColor:"#91c4f8"
        },
        headerShown:false
    }}
    >
        <Stack.Screen name='cart-screen' component={CartScreen} />
    </Stack.Navigator>
   )
}

const ProfileStackNavigator = () => {
    return( 
    <Stack.Navigator
     initialRouteName='profile-screen'
     screenOptions={{
         headerStyle:{
             backgroundColor:"#91c4f8"
         },
         headerShown:false
     }}
     >
         <Stack.Screen name='profile-screen' component={ProfileScreen} />
     </Stack.Navigator>
    )
 }
const OrderStackNavigator = () => {
    return( 
    <Stack.Navigator
     initialRouteName='order-screen'
     screenOptions={{
         headerStyle:{
             backgroundColor:"#91c4f8"
         },
         headerShown:false
     }}
     >
         <Stack.Screen name='order-screen' component={OrderScreen} />
     </Stack.Navigator>
    )
 }*/

export { MainStackNavigator }