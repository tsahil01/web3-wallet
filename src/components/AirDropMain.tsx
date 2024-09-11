import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "./ui/use-toast";
import { Coins } from "lucide-react";

export default function AirdropMainComponent() {
  const [activeTab, setActiveTab] = useState("airDrop");
  const [sol, setSol] = useState<string | number>();

  const wallet = useWallet();
  const { connection } = useConnection();

  async function sendAirdropToUser() {
    if (wallet.publicKey) {
      const sendSol = await connection.requestAirdrop(
        wallet.publicKey,
        Number(sol) * LAMPORTS_PER_SOL
      );
      if (sendSol) {
        toast({
          title: "Airdrop Success",
          description: `Airdrop of ${sol} SOL was successful`,
        });
      }
    } else {
      console.error("Wallet public key is null");
    }
  }

  return (
    <div className="flex flex-col md:gap-7 gap-4 mb-8 justify-normal">
      {/* <div className="flex gap-2 rounded-lg mx-auto">
        <Button
          variant="link"
          onClick={() => setActiveTab("airDrop")}
          className={`flex gap-1 ${activeTab === "airDrop" ? "underline" : ""}`}
        >
          AirDrop SOL
        </Button>
        <Separator orientation="vertical" className="h-8 my-auto" />
      </div> */}

      {activeTab === "airDrop" && (
        <div className="flex flex-col gap-7 px-4">
          <div className="flex flex-col gap-1">
            <h1 className="md:text-3xl text-2xl font-bold">AirDrop Solana</h1>
            <p className="text-xs dark:text-slate-500 text-gray-400">
              Get free SOL Airdroped to your wallet.
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-3 mt-3 mx-auto border p-4 rounded">
              <Input
                className=""
                type="text"
                placeholder="Enter SOL Amount"
                onChange={(e) => setSol(e.target.value)}
              />
              <Button
                className="md:col-span-1 flex gap-1"
                disabled={!wallet.publicKey}
                onClick={sendAirdropToUser}
              >
                <Coins size={24} />
                AirDrop
              </Button>
              {!wallet.publicKey && (
                <p className="text-sm text-center text-muted-foreground">
                  Connect wallet to get airdrop
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
