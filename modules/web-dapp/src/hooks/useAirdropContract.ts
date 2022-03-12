import { useCallback, useEffect, useMemo, useState } from "react";
import { AirDrop__factory as AirdropFactory } from "@homiesglobal/contracts";
import { useWeb3React } from "@web3-react/core";
import { AirdropContractAddress } from "../config/constants";

interface UseAirdropContract {
  error?: string;
  isWhitelisted?: boolean;
  isClaimed?: boolean;
  amountToBeClaimed?: number;
  claimTokens: () => Promise<void>;
}

/**
 * useAirdropContract is a react hook that make it easy to interact with the
 * HOMIE Airdrop Contract.
 * NOTE: Only use this hook after confirming the users wallet is connected
 * because this doesn't do any checks
 */
export const useAirdropContract = (): UseAirdropContract => {
  const { library, account } = useWeb3React();
  const [isWhitelisted, setIsWhitelisted] = useState<boolean | undefined>();
  const [isClaimed, setIsClaimed] = useState<boolean | undefined>();
  const [amountToBeClaimed, setAmountToBeClaimed] = useState<
    number | undefined
  >();
  const [error, setError] = useState<string | undefined>();

  // useMemo to ensure we only initialize Contract once
  const airdropContract = useMemo(() => {
    return AirdropFactory.connect(AirdropContractAddress, library.getSigner());
  }, [library]);

  // try fetching if address is whitelisted
  useEffect(() => {
    airdropContract
      .allowed(account)
      .then((isAllowed) => {
        setIsWhitelisted(isAllowed);
      })
      .catch((err) =>
        setError(`Error checking whitelist status: ${err.message}`)
      );
  }, []);

  // try fetching if claimed/not only if whitelisted
  useEffect(() => {
    if (!isWhitelisted) {
      return;
    }

    Promise.all([
      airdropContract.claims(account),
      airdropContract.amountToBeClaimed(),
    ])
      .then(([claimed, amount]) => {
        setIsClaimed(claimed);
        setAmountToBeClaimed(amount);
      })
      .catch((err) =>
        setError(`Error checking claimed status: ${err.message}`)
      );
  }, [isWhitelisted]);

  const claimTokens = useCallback((): Promise<void> => {
    return airdropContract
      .claimToken()
      .then((tx) => tx.wait())
      .catch((err) => {
        setError(`Error claiming tokens: ${err.message}`);
        return Promise.reject(err);
      });
  }, []);

  return {
    error,
    isWhitelisted,
    isClaimed,
    amountToBeClaimed,
    claimTokens,
  };
};
