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
    <Card className="mx-auto overflow-auto">
      <CardHeader className="pb-5">
        <CardTitle className="md:text-4xl text-2xl">Wallet {wallet.walletNumber}</CardTitle>
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
                <div className="flex gap-2 md:max-w-96 max-w-64">
                  <p className="border p-2 rounded-md overflow-hidden text-ellipsis truncate  md:max-w-96">
                    {wallet.keysValue.solana.publicKey}
                  </p>
                  <Copy className="my-auto" />
                </div>
              </div>
              <div className="my-2 w-full">
                <div className="text-xs mb-1">Private Key:</div>
                <div className="flex gap-2 md:max-w-96 max-w-64">
                  <p className="flex border px-2 gap-2 rounded-md w-full">
                    <Input
                      type={showSolanaPrivateKey ? "text" : "password"}
                      value={wallet.keysValue.solana.secretKey}
                      readOnly
                      className="outline-none border-0 overflow-hidden text-ellipsis truncate  md:max-w-96 m-0 p-0"
                    />
                    <div
                      className="my-auto p-0 bg-none border-none "
                      onClick={() =>
                        setShowSolanaPrivateKey(!showSolanaPrivateKey)
                      }
                    >
                      {showSolanaPrivateKey ? <EyeOff /> : <Eye />}
                    </div>
                  </p>
                  <Copy className="my-auto" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="font-bold text-xl my-auto">
                Etherium
              </div>
              <p className="font-light text-xs my-auto">
                {wallet.derivePath.eth}
              </p>
            </div>
            <div className="w-full justify-between gap-4">
              <div className="my-2 w-full">
                <div className="text-xs mb-1">Public Key:</div>
                <div className="flex gap-2 md:max-w-96 max-w-64">
                  <p className="border p-2 rounded-md overflow-hidden text-ellipsis truncate  md:max-w-96">
                    {wallet.keysValue.eth.publicKey}
                  </p>
                  <Copy className="my-auto w-10" />
                </div>
              </div>
              <div className="my-2 w-full">
                <div className="text-xs mb-1">Private Key:</div>
                <div className="flex gap-2 md:max-w-96 max-w-64">
                  <p className="flex border px-2 gap-2 rounded-md w-full">
                    <Input
                      type={showEthPrivateKey ? "text" : "password"}
                      value={wallet.keysValue.eth.privateKey}
                      readOnly
                      className="outline-none border-0 overflow-hidden text-ellipsis truncate  md:max-w-96 m-0 p-0"
                    />
                    <div
                      className="my-auto p-0 bg-none border-none "
                      onClick={() => setShowEthPrivateKey(!showEthPrivateKey)}
                    >
                      {showEthPrivateKey ? <EyeOff /> : <Eye />}
                    </div>
                  </p>
                  <Copy className="my-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
