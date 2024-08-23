"use client";

import React from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Providers({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <NextThemesProvider attribute="class" defaultTheme="system">
        <RecoilRoot>{children}</RecoilRoot>
      </NextThemesProvider>
    </>
  );
}
