"use client";

import AirdropMainComponent from "@/components/AirDropMain";
import Header from "@/components/Header";


export default function Home() {
  return (
    <div className="md:p-2 px-4 overflow-auto">
      <Header />
      <div className="mt-5 h-full overflow-auto md:container ">
        <AirdropMainComponent />
      </div>
    </div>
  );
}
    