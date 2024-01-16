import { HardhatUserConfig } from "hardhat/types";
import '@nomiclabs/hardhat-ethers';
require('dotenv').config();
// Add your Polygon network configuration here
const polygonMaticUrl = "https://polygon-mumbai-bor.publicnode.com/"; // Replace with your RPC URL
const config = {
  solidity: "0.8.20",
  networks: {
    // Other network configurations...

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
