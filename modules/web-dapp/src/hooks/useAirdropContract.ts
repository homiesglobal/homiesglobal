import { useEffect, useMemo, useState } from "react";
import { AirDrop__factory as AirdropFactory } from "@homiesglobal/contracts";
import { useWeb3React } from "@web3-react/core";
import { AirdropContractAddress } from "../config/constants";

interface UseAirdropContract {
  error?: string;
  isWhitelisted?: boolean;
  isClaimed?: boolean;
}

/**
 * useAirdropContract is a react hook that make it easy to interact with the
 * HOMIE Airdrop Contract.
 * NOTE: Only use this hook after confirming the users wallet is connected
 * because this doesn't do any checks
 */
export const useAirdropContract = (): UseAirdropContract => {
  const { library, account } = useWeb3React();
  const [isWhitelisted, setIsWhitelisted] = useState();
  const [isClaimed, setIsClaimed] = useState();
  const [error, setError] = useState<string | undefined>();

  // useMemo to ensure we only initialize Contract once
  const airdropContract = useMemo(() => {
    return AirdropFactory.connect(AirdropContractAddress, library);
  }, [library]);

  // try fetching if address is whitelisted
  useEffect(() => {
    airdropContract
      .allowed(account)
      .then((isAllowed) => {
        setIsWhitelisted(isAllowed);
      })
      .catch((err) => setError(`Error checking whitelist status: ${err}`));
  }, []);

  // try fetching if claimed/not only if whitelisted
  useEffect(() => {
    if (!isWhitelisted) {
      return;
    }

    airdropContract
      .claims(account)
      .then((claimed) => setIsClaimed(claimed))
      .catch((err) => setError(`Error checking claimed status: ${err}`));
  }, [isWhitelisted]);

  return {
    error,
    isWhitelisted,
    isClaimed,
  };
};
