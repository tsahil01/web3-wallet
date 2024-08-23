import * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WalletInterface } from "@/atom/walletsAtom";
import { Copy, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export interface WalletCardProps {
  wallet: WalletInterface;
}

export function WalletCardComponent({ wallet }: WalletCardProps) {
  const [showSolanaPrivateKey, setShowSolanaPrivateKey] = useState(false);
  const [showEthPrivateKey, setShowEthPrivateKey] = useState(false);
  const { toast } = useToast();

  return (
    <Card className="mx-auto overflow-auto">
      <CardHeader className="pb-5">
        <CardTitle className="md:text-4xl text-2xl">
          Wallet {wallet.walletNumber}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="font-bold text-xl my-auto">Solana</div>
              <p className="font-light text-xs my-auto">
                {wallet.derivePath.solana}
              </p>
            </div>
            <div className="w-full justify-between gap-4">
              <div className="my-2 w-full">
                <div className="text-xs mb-1">Public Key:</div>
                <div className="flex gap-2">
                  <p className="border p-2 rounded-md overflow-hidden text-ellipsis truncate  md:max-w-96 max-w-64">
                    {wallet.keysValue.solana.publicKey}
                  </p>
                  <Button variant={"outline"}>
                    <Copy
                      className="my-auto w-10"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          wallet.keysValue.solana.publicKey
                        );
                        toast({
                          title: "Copied!",
                          description: "Solana Public key copied to clipboard",
                        });
                        console.log(wallet.keysValue.solana.publicKey);
                      }}
                    />
                  </Button>
                </div>
              </div>
              <div className="my-2 w-full">
                <div className="text-xs mb-1">Private Key:</div>
                <div className="flex gap-2">
                  <div className="flex border gap-1 p-2  rounded-md overflow-hidden md:max-w-96 max-w-64">
                    <p className="text-ellipsis truncate">
                      {showSolanaPrivateKey
                        ? wallet.keysValue.solana.secretKey
                        : "*".repeat(wallet.keysValue.solana.secretKey.length)}
                    </p>
                    <div
                      className="my-auto p-0 bg-none border-none "
                      onClick={() =>
                        setShowSolanaPrivateKey(!showSolanaPrivateKey)
                      }
                    >
                      {showSolanaPrivateKey ? <EyeOff /> : <Eye />}
                    </div>
                  </div>
                  <Button variant={"outline"}>
                    <Copy
                      className="my-auto w-10"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          wallet.keysValue.solana.secretKey
                        );
                        toast({
                          title: "Copied!",
                          description: "Solana Private key copied to clipboard",
                        });
                        console.log(wallet.keysValue.solana.secretKey);
                      }}

                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="font-bold text-xl my-auto">Etherium</div>
              <p className="font-light text-xs my-auto">
                {wallet.derivePath.eth}
              </p>
            </div>
            <div className="w-full justify-between gap-4">
              <div className="my-2 w-full">
                <div className="text-xs mb-1">Public Key:</div>
                <div className="flex gap-2">
                  <p className="border p-2 rounded-md overflow-hidden text-ellipsis truncate md:max-w-96 max-w-64">
                    {wallet.keysValue.eth.publicKey}
                  </p>
                  <Button variant={"outline"}>
                    <Copy
                      className="my-auto w-10"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          wallet.keysValue.eth.publicKey
                        );
                        console.log(wallet.keysValue.eth.publicKey);
                        toast({
                          title: "Copied!",
                          description:
                            "Etherium Public key copied to clipboard",
                        });
                      }}
                    />
                  </Button>
                </div>
              </div>
              <div className="my-2 w-full">
                <div className="text-xs mb-1">Private Key:</div>
                <div className="flex gap-2">
                  <div className="flex border gap-1 p-2  rounded-md overflow-hidden md:max-w-96 max-w-64">
                    <p className="text-ellipsis truncate">
                      {showEthPrivateKey
                        ? wallet.keysValue.eth.privateKey
                        : "*".repeat(wallet.keysValue.eth.privateKey.length)}
                    </p>
                    <div
                      className="my-auto p-0 bg-none border-none "
                      onClick={() => setShowEthPrivateKey(!showEthPrivateKey)}
                    >
                      {showEthPrivateKey ? <EyeOff /> : <Eye />}
                    </div>
                  </div>
                  <Button variant={"outline"}>
                    <Copy
                      className="my-auto w-10"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          wallet.keysValue.eth.publicKey
                        );
                        console.log(wallet.keysValue.eth.privateKey);
                        toast({
                          title: "Copied!",
                          description:
                            "Etherium Private key copied to clipboard",
                        });
                      }}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
