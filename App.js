import React from 'react';
import RootStack from './src/navigators/RootStack';
import TripScreen from './src/ScreenView/TripScreen'
import TestS from './src/ScreenView/TestS';
import TeacherStack from './src/navigators/TeacherStack';
import DriverStack from './src/navigators/DriverStack'


export default function App() {
  return (
    <RootStack />

  );
};

