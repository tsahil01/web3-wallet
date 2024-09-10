"use client";

import Header from "@/components/Header";
import TokenMainComponent from "@/components/TokenMain";


export default function Home() {
  return (
    <div className="md:p-2 px-4 overflow-auto">
      <Header />
      <div className="mt-5 h-full overflow-auto md:container ">
        <TokenMainComponent />
      </div>
    </div>
  );
}
    