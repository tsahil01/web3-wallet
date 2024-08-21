"use client";

import { pinAtom } from "@/atom/pinAtom";
import { seedPhaseAtom } from "@/atom/seedPhaseAtom";
import Header from "@/components/Header";
import MainComponent from "@/components/Main";
import SeedPhaseComponent from "@/components/SeedPhase";
import { useRecoilState } from "recoil";

export default function Home() {
  const [seedPhase, setSeedPhase] = useRecoilState(seedPhaseAtom);
  return (
    <div className="md:p-2 px-4 overflow-auto">
      <div className="md:container flex flex-col gap-4">
        <div className="flex justify-between my-auto align-middle border-b-2 mx-4 md:mx-0">
          <Header />

          {seedPhase.length > 0 && <SeedPhaseComponent seedPhase={seedPhase} />}
        </div>
        <div className="mt-9 h-full overflow-auto">
          <MainComponent />
        </div>
      </div>
    </div>
  );
}
