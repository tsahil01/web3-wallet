"use client";

import { seedPhaseAtom } from "@/atom/seedPhaseAtom";
import Header from "@/components/Header";
import MainComponent from "@/components/Main";
import SeedPhaseComponent from "@/components/SeedPhase";
import { Button } from "@/components/ui/button";
import { useRecoilState } from "recoil";

export default function Home() {
  const [seedPhase, setSeedPhase] = useRecoilState(seedPhaseAtom);
  return (
    <div className="p-2 mt-7">
      <div className="container flex flex-col gap-4">
        <div className="flex justify-between my-auto align-middle border-b-2 ">
          <Header />
          {seedPhase.length > 0 && (
            <SeedPhaseComponent seedPhase={seedPhase} />
          )}
        </div>
        <div className="mt-9 h-full">
          <MainComponent />
        </div>
      </div>
    </div>
  );
}
