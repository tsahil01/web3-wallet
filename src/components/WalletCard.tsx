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
import { Input } from "./ui/input";

export interface WalletCardProps {
  wallet: WalletInterface;
}

export function WalletCardComponent({ wallet }: WalletCardProps) {
  const [showSolanaPrivateKey, setShowSolanaPrivateKey] = useState(false);
  const [showEthPrivateKey, setShowEthPrivateKey] = useState(false);

  return (
    <Card className="mx-auto">
      <CardHeader className="pb-5">
        <CardTitle className="text-3xl">Wallet 1</CardTitle>
        <CardDescription>Derive Path</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-1">
          <div className="flex flex-col gap-4">
            <div>
              <div className="font-bold text-2xl">Solana</div>
              <div className="w-full justify-between gap-2">
                <div className="space-y-1.5 my-2 w-full">
                  <div className="text-xs">Public Key:</div>
                  <div className="flex gap-2">
                    <p className="border p-2 rounded-md overflow-hidden text-ellipsis truncate max-w-96">
                      {wallet.keysValue.solana.publicKey}
                    </p>
                    <Copy className="my-auto" />
                  </div>
                </div>
                <div className="space-y-1.5 my-2 w-full">
                  <div className="text-xs">Private Key:</div>
                  <div className="flex gap-2">
                  <p className="flex border px-2 gap-2 rounded-md w-full">
                      <Input
                        type={showSolanaPrivateKey ? "text" : "password"}
                        value={wallet.keysValue.solana.secretKey}
                        readOnly
                        className="outline-none border-0 overflow-hidden text-ellipsis truncate max-w-96 m-0 p-0"
                      />
                      <div className="my-auto p-0 bg-none border-none "
                        onClick={() => setShowSolanaPrivateKey(!showSolanaPrivateKey)}
                      >
                        {showSolanaPrivateKey ? <EyeOff/> : <Eye />}
                      </div>
                    </p>
                    <Copy className="my-auto" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="font-bold text-2xl">Ethereum</div>
              <div className="w-full justify-between gap-2">
                <div className="space-y-1.5 my-2 w-full">
                  <div className="text-xs">Public Key:</div>
                  <div className="flex gap-2">
                    <p className="border p-2 rounded-md overflow-hidden text-ellipsis truncate max-w-96">
                      {wallet.keysValue.eth.publicKey}
                    </p>
                    <Copy className="my-auto" />
                  </div>
                </div>
                <div className="space-y-1.5 my-2 w-full">
                  <div className="text-xs">Private Key:</div>
                  <div className="flex gap-2">
                    <p className="flex border px-2 gap-2 rounded-md w-full">
                      <Input
                        type={showEthPrivateKey ? "text" : "password"}
                        value={wallet.keysValue.eth.privateKey}
                        readOnly
                        className="outline-none border-0 overflow-hidden text-ellipsis truncate max-w-96 m-0 p-0"
                      />
                      <div className="my-auto p-0 bg-none border-none "
                        onClick={() => setShowEthPrivateKey(!showEthPrivateKey)}
                      >
                        {showEthPrivateKey ? <EyeOff/> : <Eye />}
                      </div>
                    </p>
                    <Copy className="my-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
