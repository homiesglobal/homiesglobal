import { useCallback, useEffect, useState } from "react";
import { useAirdropContract } from "./useAirdropContract";

export enum ClaimPageState {
  LoadingState,
  NotEligibleState,
  EligibleState,
  ClaimTokenState,
  TokenClaimedState,
}

export interface UseClaimPage {
  currentState: ClaimPageState;
  amountToBeClaimed?: number;
  tokenSymbol?: string;
  tokenDecimals?: number;
  error?: string;
  toClaimTokenState: () => void;
  claimTokens: () => void;
}

export const useClaimPage = (): UseClaimPage => {
  const [currentState, setCurrentState] = useState<ClaimPageState>(
    ClaimPageState.LoadingState
  );
  const {
    isWhitelisted,
    isClaimed,
    error,
    claimTokens: claimAirdropToken,
    amountToBeClaimed,
  } = useAirdropContract();

  const toClaimTokenState = useCallback(() => {
    setCurrentState(ClaimPageState.ClaimTokenState);
  }, [setCurrentState]);

  const claimTokens = useCallback(() => {
    setCurrentState(ClaimPageState.LoadingState);

    claimAirdropToken()
      .then(() => {
        setCurrentState(ClaimPageState.TokenClaimedState);
      })
      .catch(() => {
        // error occurred while claiming token
        // best to just reset the whole view
        setCurrentState(ClaimPageState.ClaimTokenState);
      });
  }, []);

  useEffect(() => {
    if (isWhitelisted !== undefined && !isWhitelisted) {
      setCurrentState(ClaimPageState.NotEligibleState);
      return;
    }

    if (isClaimed !== undefined) {
      if (isClaimed) {
        setCurrentState(ClaimPageState.TokenClaimedState);
      } else {
        setCurrentState(ClaimPageState.EligibleState);
      }
    }
  }, [isWhitelisted, isClaimed]);

  return {
    currentState,
    error,
    amountToBeClaimed,
    tokenSymbol: "HOMIE", // hardcoding this, but ideally should be fetched from contract
    tokenDecimals: 2, // same with this
    toClaimTokenState,
    claimTokens,
  };
};
