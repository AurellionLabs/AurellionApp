import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  // Deploy Aura contract
  const Aura = await ethers.getContractFactory("Aura");
  const aura = await Aura.deploy();
  await aura.waitForDeployment();
  console.log("Aura deployed to:", await aura.getAddress());

  // Mint tokens to the treasury
  const mintAmount = ethers.parseUnits("1000000", 18);
  const mintTx = await aura.mintTokenToTreasury(mintAmount);
  await mintTx.wait();
  console.log(`Minted ${mintAmount.toString()} tokens to treasury`);

  // Deploy locationContract with aura as constructor argument
  const LocationContract = await ethers.getContractFactory("locationContract");
  const ausys = await LocationContract.deploy(await aura.getAddress());
  await ausys.waitForDeployment();
  console.log("locationContract deployed to:", await ausys.getAddress());

  // Approve aura spending
  const auraTotalSupply = await aura.totalSupply();
  const approveTx = await aura.approve(await ausys.getAddress(), auraTotalSupply);
  await approveTx.wait();
  console.log(`Approved ${auraTotalSupply.toString()} for spending by locationContract`);

  // Deploy AurumNodeManager with ausys and specified address
  const AurumNodeManager = await ethers.getContractFactory("AurumNodeManager");
  const aurumNodeManager = await AurumNodeManager.deploy(
    await ausys.getAddress(),
    "0x9d4CCf6c3d6a1d5583c2918028c86Cc8267a0BE6"
  );
  await aurumNodeManager.waitForDeployment();
  console.log("AurumNodeManager deployed to:", await aurumNodeManager.getAddress());

  // Deploy AuraGoat with specified addresses and aurumNodeManager as constructor arguments
  const AuraGoat = await ethers.getContractFactory("AuraGoat");
  const auraGoat = await AuraGoat.deploy(
    "0x9d4CCf6c3d6a1d5583c2918028c86Cc8267a0BE6",
    "",
    await aurumNodeManager.getAddress()
  );
  await auraGoat.waitForDeployment();
  console.log("AuraGoat deployed to:", await auraGoat.getAddress());

  // Call addToken function in aurumNodeManager with auraGoat address
  const addTokenTx = await aurumNodeManager.addToken(await auraGoat.getAddress());
  await addTokenTx.wait();
  console.log(`Added AuraGoat token to AurumNodeManager`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
