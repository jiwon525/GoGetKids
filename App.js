import React from 'react';
import RootStack from './src/navigators/RootStack';
import ScheduleScreen from './src/ScreenView/ScheduleScreen'

/*
import { createPool } from '@vercel/postgres';
const config = require('./src/components/config');
const pool = createPool({
  connectionString: config.POSTGRES_URL
});*/

export default function App() {
  return (
    <RootStack />

  );
};