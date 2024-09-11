"use client";

import AirdropMainComponent from "@/components/AirDropMain";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function Home() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | string | null>(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    getBalance();
    setIsMounted(true);
  }, [wallet]);

  if (!isMounted) {
    return null;
  }

  async function getBalance() {
    if (wallet.publicKey) {
      const balance = await connection.getBalance(wallet.publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    }
  }

  return (
    <div className="md:p-2 px-4 overflow-auto">
      <Header />
      <div className="mt-5 h-full overflow-auto md:container ">
        <div className="flex md:flex-row flex-col justify-between mb-5 gap-5">
          <div className="flex flex-row gap-4 my-auto mx-auto md:mx-0">
            <WalletMultiButton
              style={{
                margin: "0",
                padding: "10px",
              }}
            />
            <WalletDisconnectButton
              style={{
                margin: "0",
                padding: "10px",
              }}
            />
          </div>{" "}
          {wallet.publicKey && (
            <div className="flex flex-col gap-1 mx-auto md:mx-0">
              <h1 className="text-5xl font-bold my-auto">{balance} SOL</h1>
              <Button
                variant={"link"}
                size={"sm"}
                onClick={getBalance}
                className="my-auto"
              >
                Get Balance
              </Button>
            </div>
          )}
        </div>
        <AirdropMainComponent />
      </div>
    </div>
  );
}
