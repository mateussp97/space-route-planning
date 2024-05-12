"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import LatitudeSh from "@/public/latitude-sh.svg";
import { languages } from "@/utils/constants";

import { Share } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [lang, setLang] = useState("en");

  const currentLanguage = languages.find((language) => language.value === lang);

  return (
    <header className="w-full h-fit bg-transparent p-4 border-b flex items-center justify-between">
      <div className="max-w-7xl w-full h-fit mx-auto flex items-center justify-between">
        <Image
          className="w-fit h-8 object-contain"
          src={LatitudeSh}
          alt="Latitude.sh white logo"
        />

        <div className="w-fit flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto gap-1.5 text-sm"
              >
                <img
                  className="w-5 h-fit object-contain mr-2"
                  src={currentLanguage?.icon}
                  alt={currentLanguage?.title}
                />
                {currentLanguage?.title}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.title}
                  onClick={() => setLang(language.value)}
                >
                  <img
                    className="w-5 h-fit object-contain mr-2"
                    src={language.icon}
                    alt={language.title}
                  />
                  {language.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
          >
            <Share className="size-3.5" />
            Share
          </Button>
        </div>
      </div>
    </header>
  );
}
