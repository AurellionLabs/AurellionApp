import { ethers } from "hardhat";
import "dotenv";
async function main() {
    console.log(process.env.WALLET_PRIVATE_KEY)
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
    const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY as string, provider)
    // Deploy Aura contract
    const Aura = await ethers.getContractFactory("Aura");
    const aura = await Aura.connect(wallet).deploy();
    await aura.waitForDeployment();
    const auraAddress = await aura.getAddress()
    console.log("Aura deployed to:", auraAddress);

    // Mint tokens to the treasury
    const mintAmount = ethers.parseUnits("1000000", 18);
    const mintTx = await aura.mintTokenToTreasury(mintAmount);
    await mintTx.wait();
    console.log(`Minted ${mintAmount.toString()} tokens to treasury`);

    // Deploy locationContract with aura as constructor argument
    const LocationContract = await ethers.getContractFactory("locationContract");
    const ausys = await LocationContract.connect(wallet).deploy(await aura.getAddress());
    await ausys.waitForDeployment();
    const ausysAddress = await ausys.getAddress()
    console.log("locationContract deployed to:", ausysAddress);

    // Approve aura spending
    const auraTotalSupply = await aura.totalSupply();
    const approveTx = await aura.approve(await ausys.getAddress(), auraTotalSupply);
    await approveTx.wait();
    console.log(`Approved ${auraTotalSupply.toString()} for spending by locationContract`);

    // Deploy AurumNodeManager with ausys and specified address
    const AurumNodeManager = await ethers.getContractFactory("AurumNodeManager");
    const aurumNodeManager = await AurumNodeManager.connect(wallet).deploy(
        await ausys.getAddress(),
        "0x9d4CCf6c3d6a1d5583c2918028c86Cc8267a0BE6"
    );
    await aurumNodeManager.waitForDeployment();
    const aurumNodeManagerAddress = await aurumNodeManager.getAddress()
    console.log("AurumNodeManager deployed to:", aurumNodeManagerAddress);

    // Deploy AuraGoat with specified addresses and aurumNodeManager as constructor arguments
    const AuraGoat = await ethers.getContractFactory("AuraGoat");
    const auraGoat = await AuraGoat.connect(wallet).deploy(
        "0x9d4CCf6c3d6a1d5583c2918028c86Cc8267a0BE6",
        "",
        await aurumNodeManager.getAddress()
    );
    await auraGoat.waitForDeployment();
    const auraGoatAddress = await auraGoat.getAddress()
    console.log("AuraGoat deployed to:", auraGoatAddress);

    // Call addToken function in aurumNodeManager with auraGoat address
    const addTokenTx = await aurumNodeManager.addToken(await auraGoat.getAddress());
    await addTokenTx.wait();
    console.log(`Added AuraGoat token to AurumNodeManager`);

    console.log(`EXPO_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/53eb1be334c04bca983c217b8b3ca456`)
    console.log(`EXPO_PUBLIC_AUSYS_CONTRACT_ADDRESS=${ausysAddress}`)
    console.log(`EXPO_PUBLIC_AURA_CONTRACT_ADDRESS=${auraAddress}`)
    console.log(`EXPO_PUBLIC_GOAT_CONTRACT_ADDRESS=${auraGoatAddress}`)
    console.log(`EXPO_PUBLIC_NODE_MANAGER_CONTRACT_ADDRESS=${aurumNodeManagerAddress}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
