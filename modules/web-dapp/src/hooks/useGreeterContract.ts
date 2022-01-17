import { useCallback, useEffect, useMemo, useState } from "react";
import { Greeter__factory as GreeterFactory } from "@homiesglobal/contracts";
import { GreeterContractAddress } from "../config/constants";
import { useWalletProvider } from "./useEthersProvider";

type TxCallback = (txHash: string) => void;

interface UseGreeterContract {
  greeting: string;
  setNewGreeting: (newGreeting: string, callback?: TxCallback) => void;
  error?: string;
  inProgress: boolean;
}

/**
 * useGreeterContract is a react hook that returns the latest greeting and exposing a function to
 * interact with the Greeter Contract to set a new greeting value.
 */
export const useGreeterContract = (): UseGreeterContract => {
  const { txSigner } = useWalletProvider();
  const [inProgress, setInProgress] = useState(false);
  const [greeting, setGreeting] = useState("...loading");
  const [error, setError] = useState<string | undefined>();

  // useMemo to ensure we only initialize Contract once
  const greeterContract = useMemo(() => {
    return GreeterFactory.connect(GreeterContractAddress, txSigner);
  }, [txSigner]);

  // fetches the latest greetings in the GreeterSmart Contract
  useEffect(() => {
    setError(undefined);
    setInProgress(true);

    greeterContract
      .greet()
      .then((latestGreeting: string) => {
        setGreeting(latestGreeting);
      })
      .catch((err) => {
        setError(`${err}`);
      })
      .finally(() => {
        setInProgress(false);
      });
  }, [greeterContract]);

  const setNewGreeting = useCallback(
    (newGreeting: string, callback) => {
      setError(undefined);
      setInProgress(true);

      greeterContract
        .setGreeting(newGreeting)
        .then((tx) => {
          return tx.wait();
        })
        .then((receipt) => {
          setGreeting(newGreeting);
          callback?.invoke(receipt.transactionHash);
        })
        .catch((err) => {
          setError(`${err}`);
        })
        .finally(() => {
          setInProgress(false);
        });
    },
    [greeterContract]
  );

  return {
    greeting,
    setNewGreeting,
    error,
    inProgress,
  };
};
