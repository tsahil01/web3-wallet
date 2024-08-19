import { atom } from "recoil";

export interface WalletInterface {
    derivePath: {
        solana: string;
        eth: string;
    };
    keys: {
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