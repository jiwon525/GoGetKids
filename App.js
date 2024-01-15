import React from 'react';
import RootStack from './src/navigators/RootStack'
import HomeScreen from './src/screen/AccountScreen';
import LoginScreen from './src/screen/LoginScreen';
import AccountScreen from './src/screen/AccountScreen';

export default function App() {
  return (
    //<RootStack />
    <LoginScreen />
  );
}