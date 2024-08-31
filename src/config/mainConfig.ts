import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { solDerivePath } from "./solana/config";
import { ethDerivePath } from "./eth/config";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { ethers } from "ethers";

// The function createSeedPhase is used to generate a seed phrase.
export async function createSeedPhase() {
  const mnemonic = generateMnemonic();
  return mnemonic.split(" ");
}

// The function generateWallet is used to generate a wallet for a given seed and account number.
// The function takes two arguments: seed and account.
// The seed is the mnemonic seed phrase used to generate the wallet.
// The account is the number of the wallet to generate.

export async function generateWallet(seed: string, account: number) {
  const seedBuffer = mnemonicToSeedSync(seed);

  const solanaPath = solDerivePath(account - 1);
  const ethPath = ethDerivePath(account - 1);

  const solanaDerivedSeed = derivePath(
    solanaPath,
    seedBuffer.toString("hex"),
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
