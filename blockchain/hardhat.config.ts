import { HardhatUserConfig } from "hardhat/types";
import '@nomiclabs/hardhat-ethers';
require('dotenv').config();
// Add your Polygon network configuration here
const polygonMaticUrl = "https://polygon-mumbai-bor.publicnode.com"; // Replace with your RPC URL
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    // Other network configurations...
      aurellion:{
          url: "http://0.0.0.0:7545",
            chainId: 1337,
          accounts: [process.env.PRIVATE_KEY]
      },
    // Polygon Mainnet configuration
    mumbai: {
      url: polygonMaticUrl,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 80001,
      // Example gas price, you can adjust this value
    },
  },
};

export default config;

