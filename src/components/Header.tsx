import { seedPhaseAtom } from "@/atom/seedPhaseAtom";
import SeedPhaseComponent from "./SeedPhase";
import Topbar from "./Topbar";
import { useRecoilValue } from "recoil";
import { usePathname } from "next/navigation";

export default function Header() {
  const seedPhase = useRecoilValue(seedPhaseAtom);
  const pathname = usePathname()

  return (
    <>
      <div className="md:container flex flex-col gap-4">
        <Topbar />
        <div className="flex justify-between my-auto align-middle border-b-2 mx-4 md:mx-0">
          <section className="flex flex-col items-start gap-2 px-4 py-4 md:py-12 md:pb-8 lg:py-2 lg:pb-10">
            <h1 className="text-5xl font-bold leading-tight tracking-tighter md:text-7xl">
              Pouch.
            </h1>
            <p className="max-w-2xl md:text-lg text-xs text-gray-400">
              A simple, secure, and easy-to-use wallet generator for Solana.
            </p>
          </section>
          {pathname === "/wallets" && seedPhase.length > 0 && (
            <div className="flex gap-2 my-auto">
              <SeedPhaseComponent seedPhase={seedPhase} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
