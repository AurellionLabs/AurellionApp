// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LockModule = buildModule("Aurellion", (m) => {

  const aura = m.contract("Aura");
  m.call(aura, "mintTokenToTreasury", [BigInt(1000000000000000000000000)])
  const ausys = m.contract("locationContract", [aura]);

  // approve aura spending
  const auraTotalSupply = m.staticCall(aura, "totalSupply")
  m.call(aura, "approve", [ausys, auraTotalSupply])

  const aurumNodeManager = m.contract("AurumNodeManager", [ausys, "0x9d4CCf6c3d6a1d5583c2918028c86Cc8267a0BE6"])
  const auraGoat = m.contract("AuraGoat", ["0x9d4CCf6c3d6a1d5583c2918028c86Cc8267a0BE6", "", aurumNodeManager])
  m.call(aurumNodeManager, "addToken", [auraGoat])

  return { aura, ausys, aurumNodeManager, auraGoat };
});

export default LockModule;
