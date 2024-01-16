import { ethers } from "hardhat";
async function deploy() {
    const [deployer] = await ethers.getSigners();
    const Aura = await ethers.getContractFactory("Aura")
    const Ausys = await ethers.getContractFactory("locationContract");
    let aura = await Aura.deploy()
    let ausys = await Ausys.deploy(aura.address)
    await aura.deployed();
    await ausys.deployed();
    console.log(`Deployed Ausys at ${ausys.address} Aura at ${aura.address}`);
    try {
        const tx = await aura.approve(ausys.address, await aura.totalSupply());
        const receipt = await tx.wait(); // Wait for the transaction to be mined
        console.log(`Approval transaction mined! Hash: ${receipt.transactionHash}`);
    } catch (error) {
        console.error('Error during approval:', error);
        
    }

    try {
        const tx = await aura.setTreasuryAddress(deployer.address)
        const tx2 = await aura.mintTokenToTreasury(await aura.totalSupply());
        const receipt = await tx.wait(); // Wait for the transaction to be mined
        const receipt2 = await tx2.wait();
        console.log(`setTreasuryAddress transaction mined! Hash: ${receipt.transactionHash}`);
        console.log(`mintTokenToTreasury transaction mined! Hash: ${receipt2.transactionHash}`);
    } catch (error) {
        console.error('Error during minting:', error);
        
    }
}

deploy()
