import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import {
  createInitializeMetadataPointerInstruction,
  createInitializeMint2Instruction,
  createInitializeMintInstruction,
  createMint,
  ExtensionType,
  getMinimumBalanceForRentExemptMint,
  getMintLen,
  LENGTH_SIZE,
  MINT_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  TYPE_SIZE,
} from "@solana/spl-token";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import {
  Keypair,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  createInitializeInstruction,
  pack,
  TokenMetadata,
} from "@solana/spl-token-metadata";

export default function TokenMainComponent() {
  const [activeTab, setActiveTab] = useState("userTokens");
  const [solanaAddress, setSolanaAddress] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenImage, setTokenImage] = useState("");
  const [tokenSupply, setTokenSupply] = useState("");
  const [tokenDetailsAddress, setTokenDetailsAddress] = useState("");

  const { connection } = useConnection();
  const wallet = useWallet();

  async function createToken(
    tokenName: string,
    tokenSymbol: string,
    tokenImage: string,
    tokenSupply: string
  ) {
    const mintKeyPair = Keypair.generate();

    const metadata: TokenMetadata = {
      mint: mintKeyPair.publicKey,
      name: tokenName,
      symbol: tokenSymbol,
      uri: "https://cdn.100xdevs.com/metadata.json",
      additionalMetadata: [],
    };

    const minLen = getMintLen([ExtensionType.MetadataPointer]);
    const metaDataLen = TYPE_SIZE * LENGTH_SIZE * pack(metadata).length;

    const lamports = await connection.getMinimumBalanceForRentExemption(
      minLen + metaDataLen
    );

    if (wallet.publicKey) {
      const instructionOne = SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: mintKeyPair.publicKey,
        space: minLen,
        lamports,
        programId: TOKEN_2022_PROGRAM_ID,
      });

      const instructionTwo = createInitializeMetadataPointerInstruction(
        mintKeyPair.publicKey,
        wallet.publicKey,
        mintKeyPair.publicKey,
        TOKEN_2022_PROGRAM_ID
      );

      const instructionThree = createInitializeMintInstruction(
        mintKeyPair.publicKey,
        9,
        wallet.publicKey,
        null,
        TOKEN_2022_PROGRAM_ID
      );

      const instructionFour = createInitializeInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        mint: mintKeyPair.publicKey,
        metadata: mintKeyPair.publicKey,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        mintAuthority: wallet.publicKey,
        updateAuthority: wallet.publicKey,
      });

      const transaction = await new Transaction().add(instructionOne, instructionTwo, instructionThree, instructionFour);
      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      await transaction.partialSign(mintKeyPair);

      await wallet.sendTransaction(transaction, connection);

      console.log(`Token mint created at ${mintKeyPair.publicKey.toBase58()}`);
    }
  }

  return (
    <div className="flex flex-col md:gap-7 gap-4 mb-8 justify-normal">
      <div className="flex gap-2 rounded-lg mx-auto">
        <Button
          variant="link"
          onClick={() => setActiveTab("createToken")}
          className={`flex gap-1 ${
            activeTab === "createToken" ? "underline" : ""
          }`}
        >
          Create Token
        </Button>
        <Separator orientation="vertical" className="h-8 my-auto" />
        <Button
          variant="link"
          onClick={() => setActiveTab("userTokens")}
          className={`flex gap-1 ${
            activeTab === "userTokens" ? "underline" : ""
          }`}
        >
          Your Tokens
        </Button>
        <Separator orientation="vertical" className="h-8 my-auto" />
        <Button
          variant="link"
          onClick={() => setActiveTab("tokenDetails")}
          className={`flex gap-1 ${
            activeTab === "tokenDetails" ? "underline" : ""
          }`}
        >
          Token Details
        </Button>
      </div>

      {activeTab === "createToken" && (
        <div className="flex flex-col gap-7 px-4">
          <div className="flex flex-col gap-1">
            <h1 className="md:text-3xl text-2xl font-bold">
              Create a New Token
            </h1>
            <p className="text-xs dark:text-slate-500 text-gray-400">
              Fill in the details below to create your Solana token.
            </p>
          </div>
          <div className="md:grid md:grid-cols-6 flex flex-col gap-4 mt-3">
            <Input
              className="md:col-span-3"
              type="text"
              placeholder="Token Name"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
            />
            <Input
              className="md:col-span-3"
              type="text"
              placeholder="Token Symbol"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
            />
            <Input
              className="md:col-span-3"
              type="text"
              placeholder="Image URL"
              value={tokenSymbol}
              onChange={(e) => setTokenImage(e.target.value)}
            />
            <Input
              className="md:col-span-3"
              type="number"
              placeholder="Supply"
              value={tokenSupply}
              onChange={(e) => setTokenSupply(e.target.value)}
            />
            <Button
              className="mx-auto w-full"
              onClick={() => {
                console.log("Creating token");
                createToken(tokenName, tokenSymbol, tokenImage, tokenSupply);
              }}
            >
              Create Token
            </Button>
          </div>
        </div>
      )}

      {activeTab === "userTokens" && (
        <div className="flex flex-col gap-7 px-4">
          <div className="flex flex-col gap-1">
            <h1 className="md:text-3xl text-2xl font-bold">
              View User&apos;s Solana Token
            </h1>
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
