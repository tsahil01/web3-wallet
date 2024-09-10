import { atom } from "recoil";

export const rpcAtom = atom({
    key: "rpcAtom",
    default: "mainnet-beta",
});