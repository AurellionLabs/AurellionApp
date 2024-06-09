import React, {useState, useCallback, useEffect} from 'react';
import Routes from './src/navigation';
import MainProvider from './src/screens/main.provider';

import '@walletconnect/react-native-compat'

import { createWeb3Modal, defaultConfig, Web3Modal } from '@web3modal/ethers-react-native'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'bebf58b7af307d2e05fa0ff4f31ff769';

// 2. Create config
const metadata = {
  name: 'Web3Modal RN',
  description: 'Web3Modal RN Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'YOUR_APP_SCHEME://'
  }
}

const config = defaultConfig({ metadata })

// 3. Define your chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

const polygon = {
  chainId: 137,
  name: 'Polygon',
  currency: 'MATIC',
  explorerUrl: 'https://polygonscan.com',
  rpcUrl: 'https://polygon-rpc.com'
}

const chains = [mainnet, polygon]

// 4. Create modal
createWeb3Modal({
  projectId,
  chains,
  config,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})


function App(): JSX.Element {
  return (
      <MainProvider>
        <Routes />
        <Web3Modal />
      </MainProvider>
  );
}

export default App;
