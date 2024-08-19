import { seedPhaseAtom } from "@/atom/seedPhaseAtom";
import { useRecoilState } from "recoil";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { ethers } from "ethers";

export default function MainComponent() {
  const [seedPhase, setSeedPhase] = useRecoilState(seedPhaseAtom);
  const [showSeedPhase, setShowSeedPhase] = useState<boolean>(false);
  const [checked, setChecked] = useState(true);
  const [showWallets, setShowWallets] = useState<boolean>(false);
  return (
    <>
      <div className="flex gap-7 h-96 justify-center flex-col p-2">
        <div className="flex flex-col gap-1 mx-auto w-full">
          <h1 className="text-3xl font-bold mx-auto ">
            {seedPhase.length
              ? !showWallets
                ? "Your Seed Phase"
                : "Your Wallets"
              : "Welcome to Pouch"}
          </h1>
          <p className="mx-auto text-sm dark:text-slate-500 ">
            {seedPhase.length && !showWallets
              ? "Keep your seed phase save and secure!"
              : (!showWallets && "Let's get Started!") ||
                "Your wallets are ready!"}
          </p>
        </div>

        {seedPhase.length > 0 && showSeedPhase && (
          <div className="flex flex-col gap-2 mx-auto">
            <div className="grid grid-cols-3 gap-2 mx-auto">
              {seedPhase.map((word, index) => (
                <div
                  key={index}
                  className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-100 px-2 py-1 rounded-md"
                >
                  {word}
                </div>
              ))}
            </div>
            <div className="flex items-center my-2 space-x-2">
              <Checkbox
                onCheckedChange={(che: boolean) => {
                  // console.log(che);
                  setChecked(!che);
                }}
                id="terms"
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have copied my seed phrase and stored it in a safe place.
              </label>
            </div>
          </div>
        )}

        {!showWallets && (
          <div className="mx-auto mt-7">
            {seedPhase.length == 0 && (
              <Button
                className="w-[300px]"
                onClick={async () => {
                  const seedString = await createSeedPhase();
                  setSeedPhase(seedString);
                  setShowSeedPhase(true);
                }}
              >
                Create Seed Phase
              </Button>
            )}
            {seedPhase.length > 0 && (
              <Button
                className="w-[100px]"
                disabled={checked}
                onClick={() => {
                  setShowWallets(true);
                  setShowSeedPhase(false);
                }}
              >
                Next
              </Button>
            )}
          </div>
        )}
        {showWallets && seedPhase.length > 0 && (
          <>
            <div className="mx-auto mt-2">
              <Button
                className="w-[200px]"
                onClick={async () => await generateWallet(seedPhase.join(" "))}
              >
                Generate a Wallet
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

async function createSeedPhase() {
  const mnemonic = generateMnemonic();
  return mnemonic.split(" ");
}

async function generateWallet(seed: string) {
  const seedBuffer = mnemonicToSeedSync(seed);
  const i = 1;
  const msg = "hello";
  const solanaPath = `m/44'/501'/${i}'/0'`;
  const ethPath = `m/44'/60'/${i}'/0'`;

  const solanaDerivedSeed = derivePath(
    solanaPath,
    seedBuffer.toString("hex")
  ).key;

  const solanaKeypair = Keypair.fromSeed(solanaDerivedSeed);
  const solanaPublicKey = solanaKeypair.publicKey.toBase58();
  const solanaSecretKey = bs58.encode(solanaKeypair.secretKey);

  const message = new TextEncoder().encode(msg);
  const signature = nacl.sign.detached(message, solanaKeypair.secretKey);
  const result = nacl.sign.detached.verify(
    message,
    signature,
    solanaKeypair.publicKey.toBytes()
  );
  console.log(result);

  const ethDerivedSeed = derivePath(ethPath, seedBuffer.toString("hex")).key;
  const ethWallet = new ethers.Wallet(ethDerivedSeed.toString("hex"));

  const ethPublicKey = ethWallet.address;
  const ethPrivateKey = ethWallet.privateKey;

  const sig = await ethWallet.signMessage(message);
  const recoveredAddress = ethers.verifyMessage(message, sig);

console.log("Recovered Address:", recoveredAddress);
console.log("Signature is valid:", recoveredAddress === ethPublicKey);
}
