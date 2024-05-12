"use client";

import Form from "@/components/screens/home/form";
import Header from "@/components/screens/home/header";
import Informations from "@/components/screens/home/informations";
import Map from "@/components/screens/home/map";
import TravelHistory from "@/components/screens/home/travel-history";

export default function Page() {
  return (
    <div className="w-full h-screen bg-background flex flex-col">
      <Header />

      <div className="w-full h-fit bg-transparent py-8 px-4 flex flex-col">
        <div className="max-w-7xl w-full h-fit mx-auto grid grid-cols-1 gap-8">
          <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 items-stretch gap-8">
            <div className="w-full h-fit relative flex-col items-start gap-8">
              <form className="grid w-full items-start gap-6">
                <Form />
                <Informations />
              </form>
            </div>
            <TravelHistory />
          </div>

          <Map />
        </div>
      </div>
    </div>
  );
}
