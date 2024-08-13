import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { expect } from "chai";
import { AurumNode, PackageDeliveryData } from "./TestTypes";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "hardhat/internal/hardhat-network/stack-traces/model";

describe("Ausys", function() {
    let customer: SignerWithAddress,
        receiver: SignerWithAddress,
        driver: SignerWithAddress,
        ausys: any,
        aura: any,
        auraGoat: any,
        aurumNodeManager: any,
        aurumNode: any,
        balanceBefore: any;

    // Setup for the tests
    before(async () => {
        const signers = await ethers.getSigners();
        [customer, receiver, driver] = signers;

        const Aura = await ethers.getContractFactory("Aura");
        const Ausys = await ethers.getContractFactory("locationContract");
        const AuraGoat = await ethers.getContractFactory("AuraGoat")
        const AurumNodeManager = await ethers.getContractFactory("AuraNodeManager")
        const AurumNode = await ethers.getContractFactory("AuraNodeManager")
        aurumNodeManager = await AurumNodeManager.deploy()
        auraGoat = await AuraGoat.deploy(aurumNodeManager.getAddress())
        aura = await Aura.deploy();
        ausys = await Ausys.deploy(aura.getAddress());
        aurumNode = await AurumNode.deploy(ausys.getAddress());

        console.log(`Deployed Ausys at ${ausys.getAddress()} and Aura at ${aura.getAddress()}`);

        await aura.setTreasuryAddress(customer.getAddress());
        await aura.mintTokenToTreasury();

        // Approve tokens for the ausys contract
        for (let signer of [customer, receiver, driver]) {
            await aura.connect(signer).approve(ausys.getAddress(), aura.totalSupply());
        }

        // Transfer tokens
        await Promise.all([
            aura.transfer(driver, 10),
            aura.transfer(receiver, 10)
        ]);

        balanceBefore = await aura.balanceOf(customer);
    });

    describe("Job Creation", function() {
        const packageDeliveryData: PackageDeliveryData = {
            startLocation: { lat: "1", lng: "1" },
            endLocation: { lat: "1", lng: "1" },
            startName: "20 place",
            endName: "4 place"
        };

        before(async () => {
            await ausys.jobCreation(customer, receiver, packageDeliveryData, 1, 1);
        });

        it("Job counter went up", async function() {
            expect(await ausys.jobIdCounter()).to.equal(1);
        });

        it("Number of jobs created for customer went up", async function() {
            expect(await ausys.numberOfJobsCreatedForCustomer(customer)).to.equal(1);
        });

        it("Balance went down by 1", async function() {
            const balanceAfter = await aura.balanceOf(customer);
            expect(balanceBefore - BigInt(1 * 10 ** 18)).to.equal(balanceAfter);
        });
    });
    describe("Node Registration", () => {
        var node: AurumNode;
        node = {
            location: { lat: "1", lng: "1" },
            //stteal ausys location struct
            validNode: new Uint8Array(1),
            owner: customer.address,
            supportedAssets: [1],
            status: new Uint8Array(1),
            capacity: [100]
            //capacity needs to be kept on an asset by asset basis
        }
        it("Node is Created", async () => {
            let nodeAddress = await aurumNode.registerNode(node)
            console.log(nodeAddress)
            expect(nodeAddress).to.be.string
        })
    })
});

