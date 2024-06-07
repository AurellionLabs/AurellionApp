import React, {useState, useCallback, useEffect} from 'react';
import Routes from './src/navigation';
import MainProvider from './src/screens/main.provider';

import '@walletconnect/react-native-compat';
import {WagmiConfig} from 'wagmi';
import {polygonAmoy} from './src/utils/customChains'
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from '@web3modal/wagmi-react-native';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'bebf58b7af307d2e05fa0ff4f31ff769';

// 2. Create config
const metadata = {
  name: 'Web3Modal RN',
  description: 'Web3Modal RN Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

const chains = [polygonAmoy];

const wagmiConfig = defaultWagmiConfig({chains, projectId, metadata});

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

function App(): JSX.Element {
  return (
    <WagmiConfig config={wagmiConfig}>
      <MainProvider>
        <Routes />
      </MainProvider>
      <Web3Modal />
    </WagmiConfig>
  );
}

export default App;
