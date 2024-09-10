"use client";

import Header from "@/components/Header";
import MainComponent from "@/components/Main";


export default function Home() {
  return (
    <div className="md:p-2 px-4 overflow-auto">
      <Header />
      <div className="mt-9 h-full overflow-auto md:container ">
        <MainComponent />
      </div>
    </div>
  );
}
