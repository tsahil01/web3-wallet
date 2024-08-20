import { seedPhaseAtom } from "@/atom/seedPhaseAtom";
import { useRecoilState } from "recoil";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { ethers } from "ethers";
import { solDerivePath } from "@/config/solana/config";
import { ethDerivePath } from "@/config/eth/config";
import { WalletInterface, walletsAtom } from "@/atom/walletsAtom";
import { WalletCardComponent } from "./WalletCard";
import { pinAtom } from "@/atom/pinAtom";
import SetPinComponent from "./PinComponent";

export default function MainComponent() {
  const [seedPhase, setSeedPhase] = useRecoilState(seedPhaseAtom);
  const [showSeedPhase, setShowSeedPhase] = useState<boolean>(false);
  const [checked, setChecked] = useState(true);
  const [showWallets, setShowWallets] = useState<boolean>(false);
  const [wallets, setWallets] = useRecoilState(walletsAtom);
  const [pin, setPin] = useRecoilState(pinAtom);
  return (
    <>
      <div className="flex md:flex-row flex-col md:gap-7 gap-4 mb-8 justify-normal">
        <div className="flex flex-col gap-1 px-4 mx-auto w-full">
          <h1 className="md:text-3xl text-2xl font-bold mx-auto md:m-0">
            {seedPhase.length
              ? !showWallets
                ? "Your Seed Phase"
                : "Your Wallets"
              : "Welcome to Wallet Generator"}
          </h1>
          <p className=" md:text-sm text-xs dark:text-slate-500 mx-auto md:m-0">
            {seedPhase.length && !showWallets
              ? "Keep your seed phase save and secure!"
              : (!showWallets && "Let's get Started!") ||
                ""}
          </p>
        </div>

        {!showWallets && (
          <div className="mx-auto mt-2">
            {seedPhase.length == 0 && pin.length > 0 && (
              <Button
                className="md:w-[200px] font-bold"
                onClick={async () => {
                  const seedString = await createSeedPhase();
                  setSeedPhase(seedString);
                  setShowSeedPhase(true);
                }}
              >
                Create Seed Phase
              </Button>
            )}
            {seedPhase.length == 0 && pin.length == 0 && (
              <SetPinComponent />
            )}
            {seedPhase.length > 0 && (
              <Button
                className="md:w-[100px]"
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
                className=""
                onClick={async () => {
                  let res: WalletInterface = await generateWallet(
                    seedPhase.join(" "),
                    wallets.length + 1
                  );
                  console.log(res);
                  setWallets([...wallets, res]);
                }}
              >
                Generate a Wallet
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="mx-auto flex">

      {seedPhase.length > 0 && showSeedPhase && (
          <div className="flex flex-col gap-2 mx-auto">
            <div className="grid grid-cols-3 gap-2 mx-auto">
              {seedPhase.map((word, index) => (
                <div
                  key={index}
                  className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-100 md:px-4 md:py-2 px-2 py-2 rounded-md md:text-lg text-sm"
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

        {showWallets && wallets.length > 0 && (
          <>
          <div className="grid md:grid-cols-2 md:gap-5 gap-3 my-3 mx-auto">
            {wallets.map((wallet, index) => (
              console.log("Wallets: ",wallet),
              <WalletCardComponent wallet={wallet} />
            ))}
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

async function generateWallet(seed: string, account: number) {
  const seedBuffer = mnemonicToSeedSync(seed);

  const solanaPath = solDerivePath(account);
  const ethPath = ethDerivePath(account);

  const solanaDerivedSeed = derivePath(
    solanaPath,
    seedBuffer.toString("hex")
  ).key;

  const solanaKeypair = Keypair.fromSeed(solanaDerivedSeed);
  const solanaPublicKey = solanaKeypair.publicKey.toBase58();
  const solanaSecretKey = bs58.encode(solanaKeypair.secretKey);

  const ethDerivedSeed = derivePath(ethPath, seedBuffer.toString("hex")).key;

  const ethWallet = new ethers.Wallet(ethDerivedSeed.toString("hex"));

  const ethPublicKey = ethWallet.address;
  const ethPrivateKey = ethWallet.privateKey;

  return {
    walletNumber: account,
    derivePath: {
      solana: solanaPath,
      eth: ethPath,
    },
    keysValue: {
      solana: {
        publicKey: solanaPublicKey,
        secretKey: solanaSecretKey,
      },
      eth: {
        publicKey: ethPublicKey,
        privateKey: ethPrivateKey,
      },
    },
  };
}
