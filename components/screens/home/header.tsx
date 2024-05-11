import { Button } from "@/components/ui/button";
import LatitudeSh from "@/public/latitude-sh.svg";

import { Share } from "lucide-react";

import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full h-fit bg-transparent p-4 border-b flex items-center justify-between">
      <div className="max-w-7xl w-full h-fit mx-auto flex items-center justify-between">
        <Image
          className="w-fit h-8 object-contain"
          src={LatitudeSh}
          alt="Latitude.sh white logo"
        />

        <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
          <Share className="size-3.5" />
          Share
        </Button>
      </div>
    </header>
  );
}
