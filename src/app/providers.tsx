"use client";

import React from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Providers({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <RecoilRoot>{children}</RecoilRoot>
      </NextThemesProvider>
    </>
  );
}
