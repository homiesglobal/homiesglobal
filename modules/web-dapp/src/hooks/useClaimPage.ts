import { useEffect, useState } from "react";
import { useAirdropContract } from "./useAirdropContract";

export enum ClaimPageState {
  LoadingState,
  NotEligibleState,
  EligibleState,
  TokenClaimedState,
}

interface UseClaimPage {
  currentState: ClaimPageState;
  error?: string;
}

export const useClaimPage = (): UseClaimPage => {
  const [currentState, setCurrentState] = useState<ClaimPageState>(
    ClaimPageState.LoadingState
  );
  const airdrop = useAirdropContract();

  useEffect(() => {
    if (airdrop.isWhitelisted !== undefined && !airdrop.isWhitelisted) {
      setCurrentState(ClaimPageState.NotEligibleState);
      return;
    }

    if (airdrop.isClaimed !== undefined) {
      if (airdrop.isClaimed) {
        setCurrentState(ClaimPageState.TokenClaimedState);
      } else {
        setCurrentState(ClaimPageState.EligibleState);
      }
    }
  }, [airdrop]);

  return {
    currentState,
    error: airdrop.error,
  };
};
