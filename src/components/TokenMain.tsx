import { ToyBrick, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function TokenMainComponent() {
  const [activeTab, setActiveTab] = useState("userTokens");
  const [solanaAddress, setSolanaAddress] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenSupply, setTokenSupply] = useState("");
  const [tokenDetailsAddress, setTokenDetailsAddress] = useState("");

  return (
    <div className="flex flex-col md:gap-7 gap-4 mb-8 justify-normal">
      <div className="flex gap-2 rounded-lg mx-auto">
        <Button
          variant="link"
          onClick={() => setActiveTab("createToken")}
          className={`flex gap-1 ${activeTab === "createToken" ? "underline" : ""}`}
        >
          Create Token
        </Button>
        <Separator orientation="vertical" className="h-8 my-auto" />
        <Button
          variant="link"
          onClick={() => setActiveTab("userTokens")}
          className={`flex gap-1 ${activeTab === "userTokens" ? "underline" : ""}`}
        >
          Your Tokens
        </Button>
        <Separator orientation="vertical" className="h-8 my-auto" />
        <Button
          variant="link"
          onClick={() => setActiveTab("tokenDetails")}
          className={`flex gap-1 ${activeTab === "tokenDetails" ? "underline" : ""}`}
        >
          Token Details
        </Button>
      </div>

      {activeTab === "createToken" && (
        <div className="flex flex-col gap-7 px-4">
          <div className="flex flex-col gap-1">
            <h1 className="md:text-3xl text-2xl font-bold">Create a New Token</h1>
            <p className="text-xs dark:text-slate-500 text-gray-400">
              Fill in the details below to create your Solana token.
            </p>
          </div>
          <div className="md:grid md:grid-cols-8 flex flex-col gap-4 mt-3">
            <Input
              className="md:col-span-3"
              type="text"
              placeholder="Token Name"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
            />
            <Input
              className="md:col-span-2"
              type="text"
              placeholder="Token Symbol"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
            />
            <Input
              className="md:col-span-2"
              type="number"
              placeholder="Supply"
              value={tokenSupply}
              onChange={(e) => setTokenSupply(e.target.value)}
            />
            <Button className="md:col-span-1">Create Token</Button>
          </div>
        </div>
      )}

      {activeTab === "userTokens" && (
        <div className="flex flex-col gap-7 px-4">
          <div className="flex flex-col gap-1">
            <h1 className="md:text-3xl text-2xl font-bold">View User's Solana Token</h1>
            <p className="text-xs dark:text-slate-500 text-gray-400">
              Enter the address to view token information.
            </p>
          </div>
          <div className="md:grid md:grid-cols-8 flex flex-col gap-4 mt-3">
            <Input
              className="md:col-span-7"
              type="text"
              placeholder="Enter Solana address"
              value={solanaAddress}
              onChange={(e) => setSolanaAddress(e.target.value)}
            />
            <Button className="md:col-span-1">View Tokens</Button>
          </div>
        </div>
      )}

      {activeTab === "tokenDetails" && (
        <div className="flex flex-col gap-7 px-4">
          <div className="flex flex-col gap-1">
            <h1 className="md:text-3xl text-2xl font-bold">Token Details</h1>
            <p className="text-xs dark:text-slate-500 text-gray-400">
              Enter the token address to view its details on Solana.
            </p>
          </div>
          <div className="md:grid md:grid-cols-8 flex flex-col gap-4 mt-3">
            <Input
              className="md:col-span-6"
              type="text"
              placeholder="Enter Token Address"
              value={tokenDetailsAddress}
              onChange={(e) => setTokenDetailsAddress(e.target.value)}
            />
            <Button className="md:col-span-2">View Details</Button>
          </div>
        </div>
      )}
    </div>
  );
}
