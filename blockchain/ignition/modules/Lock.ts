// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LockModule = buildModule("Aurellion", (m) => {

  const aura = m.contract("Aura");
  const ausys = m.contract("locationContract", [aura]);

  // approve aura spending
  const auraTotalSupply = m.staticCall(aura, "totalSupply")
  m.call(aura, "approve", [ausys, auraTotalSupply])

  const aurumNodeManager = m.contract("AurumNodeManager", [])
  const auraGoat = m.contract("AuraGoat")

  return { aura, ausys };
});

export default LockModule;
