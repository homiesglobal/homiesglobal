import { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import { Greeter__factory as GreeterFactory } from "@homiesglobal/contracts";

interface UseGreeterContract {
  greeting: string;
}

export const useGreeterContract = (): UseGreeterContract => {
  // useMemo to ensure we only initialize Contract once
  const greeterContract = useMemo(() => {
    const provider = new ethers.providers.JsonRpcProvider();
    return GreeterFactory.connect(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      provider
    );
  }, []);

  const [greeting, setGreeting] = useState("...loading");

  useEffect(() => {
    greeterContract
      .greet()
      .then((latestGreeting: string) => {
        setGreeting(latestGreeting);
      })
      .catch((err) => {
        console.error("Failed to fetch latest greeting", err);
      });
  }, [greeterContract]);

  return {
    greeting,
  };
};
