import { ethers } from "ethers";
import { useMemo } from "react";

interface UseWalletProvider {
  txSigner: ethers.Signer;
}

/**
 * useWalletProvider hook returns the transaction signer for a particular wallet provider.
 *
 * For now, it just returns a JsonRpcProvider signer which connects to the localhost:8545 hardhat client.
 */
export const useWalletProvider = (): UseWalletProvider => {
  const txSigner = useMemo(() => {
    const provider = new ethers.providers.JsonRpcProvider();
    return provider.getSigner();
  }, []);

  // TODO: Add logic to export metamask provider if not on localhost

  return {
    txSigner,
  };
};
