import React from 'react';
import RootStack from './src/navigators/RootStack';
import TripScreen from './src/ScreenView/TripScreen'
import TestS from './src/ScreenView/TestS';
import TeacherStack from './src/navigators/TeacherStack';
import DriverStack from './src/navigators/DriverStack'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpScreen from './src/ScreenView/SignupScreen';
import { UserSessionProvider } from './UserSessionContext';
import TabNavigator from './src/navigators/TabNavigator';
import ChildStack from './src/navigators/ChildStack';

const App = () => {
  return (
    <UserSessionProvider>
      <RootStack />
    </UserSessionProvider>
  );
};

export default App;