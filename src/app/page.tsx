"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Wallet,
  Shield,
  Zap,
  Coins,
  Gift,
  Gem,
  ExternalLink,
} from "lucide-react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <section className="mb-16 text-center">
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-l from-purple-600 to-blue-600 text-transparent bg-clip-text">
            Your Gateway to Crypto
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-md">
            Create wallets, manage tokens, and explore the world of
            cryptocurrencies across multiple chains.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Button className="group"
            onClick={() => router.push('/wallets')}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline">
              Learn More
            </Button>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden group">
              <CardHeader className="bg-gradient-to-br from-background to-secondary/10 transition-colors group-hover:to-secondary/20">
                <feature.icon className="h-12 w-12 mb-4 text-primary" />
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">Supported Chains</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {chains.map((chain, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-lg py-2 px-4"
              >
                {chain}
              </Badge>
            ))}
          </div>
        </section>

        <section className="text-center bg-secondary/20 py-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Dive In?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Create your first wallet, mint a token, or explore our features.
            It&apos;s all at your fingertips!
          </p>
          <div className="flex flex-row gap-3 mx-auto justify-center">
            <Button className="animate-pulse">
              Create Wallet
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button variant={"outline"} className="">
              Manage Token
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

const features = [
  {
    title: "Multi-Chain Wallets",
    description:
      "Create and manage wallets across various blockchain networks with ease and security.",
    icon: Wallet,
  },
  {
    title: "Token Creation",
    description:
      "Launch your own tokens on multiple chains with our intuitive token creation tools.",
    icon: Coins,
  },
  {
    title: "Enhanced Security",
    description:
      "Your keys, your crypto. Benefit from industry-leading security measures to protect your assets.",
    icon: Shield,
  },
  {
    title: "Lightning Fast",
    description:
      "Experience rapid transactions and real-time updates across all supported chains.",
    icon: Zap,
  },
  {
    title: "NFT Support",
    description: "Mint, transfer, and manage NFTs directly from our platform.",
    icon: Gem,
  },
  {
    title: "Rewards Program",
    description:
      "Earn rewards for using our platform and participating in the ecosystem.",
    icon: Gift,
  },
];

const chains = [
  "Ethereum",
  "Solana",
  "Binance Smart Chain",
  "Polygon",
  "Avalanche",
  "and more...",
];
