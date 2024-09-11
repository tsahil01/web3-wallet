import { ArrowDownToDotIcon, ChevronDown, Coins, DropletsIcon, ToyBrick, Wallet, WalletMinimal } from "lucide-react";
import { ThemeToggle } from "./ThemeSwitch";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { rpcAtom } from "@/atom/rpcAtom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Topbar() {
  const router = useRouter();
  const [rpc, setRpc] = useRecoilState(rpcAtom);

  const handleRpcChange = (value: string) => {
    setRpc(value);
  };

  return (
    <>
      <div className="flex flex-row justify-end md:gap-4 gap-2 mt-2 my-auto">
        <div className="flex border gap-2 rounded-lg">
          <Button
            variant={"link"}
            className="flex gap-1"
            onClick={() => router.push("/wallets")}
          >
            <span className="hidden md:inline">Wallets</span>
            <WalletMinimal />
          </Button>

          <Separator orientation="vertical" className="h-8 my-auto" />

          <Button
            variant={"link"}
            className="flex gap-1"
            onClick={() => router.push("/airdrop")}
          >
            <span className="hidden md:inline">Airdrop SOL</span>
            <DropletsIcon />
          </Button>

          <Separator orientation="vertical" className="h-8 my-auto" />

          <Button
            variant={"link"}
            className="flex gap-1"
            onClick={() => router.push("/tokens")}
          >
            <span className="hidden md:inline">Tokens</span>
            <Coins />
          </Button>

          <Separator orientation="vertical" className="h-8 my-auto" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="flex gap-2 font-bold" disabled>
                {rpc.charAt(0).toUpperCase() + rpc.slice(1)}{" "}
                <ChevronDown className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleRpcChange("mainnet-beta")}>
                Mainnet
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRpcChange("testnet")}>
                Testnet
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRpcChange("devnet")}>
                Devnet
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ThemeToggle />
      </div>
    </>
  );
}
