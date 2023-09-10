import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { expect } from "chai";
import { PackageDeliveryData } from "../AurellionApp/aurellion/src/common/types/types";

describe("Ausys", function () {
    let customer, receiver, driver, ausys, aura, balanceBefore;

    // Setup for the tests
    before(async () => {
        const signers = await ethers.getSigners();
        [customer, receiver, driver] = signers;

        const Aura = await ethers.getContractFactory("Aura");
        const Ausys = await ethers.getContractFactory("locationContract");

        aura = await Aura.deploy();
        ausys = await Ausys.deploy(aura.getAddress());

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

    describe("Job Creation", function () {
        const packageDeliveryData: PackageDeliveryData = {
            startLocation: { lat: "1", lng: "1" },
            endLocation: { lat: "1", lng: "1" },
            startName: "20 place",
            endName: "4 place"
        };

        before(async () => {
            await ausys.jobCreation(customer, receiver, packageDeliveryData, 1, 1);
        });

        it("Job counter went up", async function () {
            expect(await ausys.jobIdCounter()).to.equal(1);
        });

        it("Number of jobs created for customer went up", async function () {
            expect(await ausys.numberOfJobsCreatedForCustomer(customer)).to.equal(1);
        });

        it("Balance went down by 1", async function () {
            const balanceAfter = await aura.balanceOf(customer);
            expect(balanceBefore - BigInt(1 * 10 ** 18)).to.equal(balanceAfter);
        });
    });
});

