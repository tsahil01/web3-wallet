"use client";

import React from "react";
import { RecoilRoot } from "recoil";

export default function Providers({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <RecoilRoot>{children}</RecoilRoot>
    </>
  );
}
