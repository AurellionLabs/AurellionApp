import { ethers } from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { PackageDeliveryData } from "../AurellionApp/aurellion/src/common/types/types";

describe("Ausys", function () {
    async function loadFixtureOne () { 
        const [customer,reciever,driver] = await ethers.getSigners();
        const Aura = await ethers.getContractFactory("Aura")
        const Ausys = await ethers.getContractFactory("AuSys");
        const aura = await Aura.deploy()
        const ausys = await Ausys.deploy(aura.getAddress())
        console.log(`Deployed Ausys at ${ausys.getAddress()} Aura at ${aura.getAddress()}`);
        await(aura as any).approve(ausys.getAddress(),aura.totalSupply())
        await(aura as any).connect(reciever).approve(ausys.getAddress(),aura.totalSupply())
        await (aura as any).connect(driver).approve(ausys.getAddress(),aura.totalSupply())
        await aura.setTreasuryAddress(customer.getAddress())
        await aura.mintTokenToTreasury()
        await aura.transfer(driver,10)
        await aura.transfer(reciever,10)
        return{customer,reciever,driver,ausys,aura};
    }
    describe("Job Creation "), async function (){
        const {customer,reciever,driver,ausys,aura} = await loadFixture(loadFixtureOne) 
        const packageDeliveryData:PackageDeliveryData = {
            startLocation : {
                lat:"1",
                lng:"1"
            },
            endLocation : {
                lat:"1",
                lng:"1"
            },
            startName: "20 place",
            endName: "4 place"        
        };
        const balanceBefore = await aura.balanceOf(customer)
        await ausys.jobCreation(customer,reciever, packageDeliveryData, 1, 1)
        it("Job counter went up"), async function () {
            expect(await ausys.jobIdCounter()).to.be.equal(1)
        }
        it("Number of jobs created for customer went up"), async function () {
            expect(await ausys.numberOfJobsCreatedForCustomer(customer)).to.equal(1) 
            }
        it("Balance went down by 1"), async function() {
            const balanceAfter = await aura.balanceOf(customer)
            expect(balanceBefore - (1 * 10 ** 18)).to.equal(balanceAfter)
            }
        }
    });
    // We recommend this pattern to be able to use async/await everywhere
    // and properly handle errors.
