import React from 'react';
import { App as RouterApp } from './node_modules/expo-router/_app';
import { UserSessionProvider } from './UserSessionContext'

const App = () => {
  return (
    <UserSessionProvider>
      <RouterApp />
    </UserSessionProvider>
  );
};

export default App;