import React, { useState, useCallback, useEffect } from 'react';
import Routes from '../navigation';
import MainProvider from './main.provider';
import { listenForSignature } from '../dapp-connectors/dapp-listener';
function App(): JSX.Element {
    useEffect(() => {
        listenForSignature()
    }, [])
    return (
        <MainProvider >
            <Routes />
        </MainProvider>
    );
}

export default App;
