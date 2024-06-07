import {defineChain} from 'viem';

export const polygonAmoy = defineChain({
    id: 80_002,
    name: 'Polygon Amoy',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: {
      default: {
        http: ['https://rpc-amoy.polygon.technology'],
      },
      public: { // Add the 'public' property here
        http: ['https://rpc-amoy.polygon.technology'],
    },
    },
    blockExplorers: {
      default: {
        name: 'PolygonScan',
        url: 'https://amoy.polygonscan.com',
        apiUrl: 'https://api-amoy.polygonscan.com/api',
      },
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 3127388,
      },
    },
    testnet: true,
  });
