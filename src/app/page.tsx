"use client";

import Header from "@/components/Header";
import MainComponent from "@/components/Main";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  return (
    <div className="p-2 mt-7">
      <div className="container flex flex-col gap-4">
        <Header />
        <div className="mt-9 h-full">
          <MainComponent />
        </div>
      </div>
    </div>
  );
}
