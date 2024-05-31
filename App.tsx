import React, { useState, useCallback, useEffect } from 'react';
import Routes from './src/navigation';
import MainProvider from './src/screens/main.provider';

function App(): JSX.Element {
  return (
    <MainProvider>
      <Routes />
    </MainProvider>
  );
}

export default App;
