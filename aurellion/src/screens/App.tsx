import React, { useState, useCallback, useEffect } from 'react';
import Routes from '../navigation';
import MainProvider from './main.provider';
import { listenForSignature } from '../dapp-connectors/dapp-listener';
import { getSigner } from '../dapp-connectors/wallet-utils';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
function App(): JSX.Element {
  useEffect(() => {
    async function start() {
      console.log('started');
      if (await getSigner()) {
        listenForSignature();
      }
    }
    start();
  }, []);
  return (
    <MainProvider>
      <Routes />
    </MainProvider>
  );
}

export default App;
