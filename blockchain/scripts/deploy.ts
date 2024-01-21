import { ethers } from "hardhat";
async function deploy(){
        const [deployer] = await ethers.getSigners();
        const Aura = await ethers.getContractFactory("Aura")
        const Ausys = await ethers.getContractFactory("locationContract");
        const aura = await Aura.deploy()
        const ausys = await Ausys.deploy(aura.address)
        console.log(`Deployed Ausys at ${ausys.address} Aura at ${aura.address}`);
        await(aura as any).approve(ausys.address,aura.totalSupply())

}

deploy()