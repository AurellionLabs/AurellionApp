import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config"

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.27", // You can keep this as the latest version for compatibility with newer contracts
      },
      {
        version: "0.8.26", // To support contracts with pragma ^0.8.26 or 0.8.26
      },
      {
        version: "0.8.17", // To support contracts with pragma ^0.8.17
      },
    ],
  },
  networks: {
    polygonAmoy: {
      url: process.env.RPC_URL,
      accounts: [process.env.WALLET_PRIVATE_KEY as string]
    }
  }
};

export default config;