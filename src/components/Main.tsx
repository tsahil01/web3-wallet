import { seedPhaseAtom } from "@/atom/seedPhaseAtom";
import { useRecoilState } from "recoil";
import { Button } from "./ui/button";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";

export default function MainComponent() {
  const [seedPhase, setSeedPhase] = useRecoilState(seedPhaseAtom);
  return (
    <>
      <div className="flex gap-7 h-96 justify-between flex-col p-2">
        <div className="flex flex-col gap-1 mx-auto w-full">
          <h1 className="text-4xl font-bold mx-auto ">Welcome to Pouch</h1>
          <p className="mx-auto dark:text-slate-500 ">Lets get Started</p>
        </div>
            <div className="mx-auto mt-7">
              <Button
                className="w-[300px]"
                onClick={async () => {
                  const seedString = await createSeedPhase();
                  setSeedPhase(seedString);
                }}
              >
                Create Seed Phase
              </Button>
            </div>
      </div>
    </>
  );
}

async function createSeedPhase() {
  const mnemonic = generateMnemonic();
  return mnemonic.split(" ");
}
