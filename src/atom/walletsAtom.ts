import { atom } from "recoil";

export interface WalletInterface {
    walletNumber: number;
    derivePath: {
        solana: string;
        eth: string;
    };
    keysValue: {
        solana: {
            publicKey: string;
            secretKey: string;
        };
        eth: {
            publicKey: string;
            privateKey: string;
        };
    };
}


export const walletsAtom = atom<WalletInterface[]>({
    key: "walletsAtom",
    default: [],
});