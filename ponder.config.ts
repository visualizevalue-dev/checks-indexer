import { createConfig } from "@ponder/core";
import { http } from "viem";

import { ChecksAbi } from "./abis/ChecksAbi";

export default createConfig({
  networks: {
    mainnet: { chainId: 1, transport: http(process.env.PONDER_RPC_URL_1) },
  },
  contracts: {
    Checks: {
      abi: ChecksAbi,
      address: "0x036721e5a769cc48b3189efbb9cce4471e8a48b1",
      network: "mainnet",
      startBlock: 16615226,
    },
  },
});
