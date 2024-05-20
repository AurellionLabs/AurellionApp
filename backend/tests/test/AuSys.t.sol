pragma solidity ^0.8.25;
//SPDX-License-Identifier: MIT
import {locationContract} from "../src/AuSys.sol";
import {Aura} from "../src/Aura.sol";
import {Test, console} from "forge-std/Test.sol";

contract AuSysTest is Test {
    address driver = makeAddr("driver");
    address customer = makeAddr("customer");
    address reciever = makeAddr("reciever");
    struct Location {
        string lat;
        string lng;
    }
    struct ParcelData {
        Location startLocation;
        Location endLocation;
        string startName;
        string endName;

        //add customer?
        //add driver?
        //add box
    }
    locationContract.ParcelData data =
        locationContract.ParcelData({
            startLocation: locationContract.Location({lat: "1", lng: "1"}),
            endLocation: locationContract.Location({lat: "1", lng: "1"}),
            startName: "The Shire",
            endName: "Moordoor"
        });
    Aura aura = new Aura();
    locationContract ausys = new locationContract(aura);

    function setUp() public {
        aura.mintTokenToTreasury(100000000000000000000000000);
        aura.approve(address(customer), aura.totalSupply());
        aura.transfer(customer, aura.balanceOf(address(this)));
        vm.prank(customer);
        aura.approve(address(ausys), aura.totalSupply());
    }

    function test_signatureEvent() public {
        vm.startPrank(customer);
        aura.approve(address(ausys), aura.totalSupply());
        ausys.jobCreation(customer, reciever, data, 1, 1);
        bytes32 jobid = ausys.customerToJobId(customer,0);
        ausys.assignDriverToJobId(driver,jobid);
        ausys.packageSign(driver,customer,jobid);
        vm.stopPrank();
    }
}
