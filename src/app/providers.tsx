"use client";

import React from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

export default function Providers({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <ConnectionProvider
        endpoint={
          "https://solana-devnet.g.alchemy.com/v2/vYa-RYjmjTm_eOz511A0gCCyS9bxvkVa"
        }
      >
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <NextThemesProvider attribute="class" defaultTheme="light">
              <RecoilRoot>{children}</RecoilRoot>
            </NextThemesProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}
