"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, usePathname } from "@/navigation";

import LatitudeSh from "@/public/latitude-sh.svg";
import { languages } from "@/utils/constants";

import { Share } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const currentLanguage = languages.find(
    (language) => language.value === locale
  );
  const pathname = usePathname();
  const t = useTranslations("home");

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
                {t(currentLanguage?.title)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((language) => (
                <DropdownMenuItem key={language.title}>
                  <Link href={pathname} locale={language.value as "pt" | "en"}>
                    <div className="w-full flex">
                      <img
                        className="w-5 h-fit object-contain mr-2"
                        src={language.icon}
                        alt={t(language.title)}
                      />
                      {t(language.title)}
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-sm hidden sm:flex"
          >
            <Share className="size-3.5" />
            Share
          </Button>
        </div>
      </div>
    </header>
  );
}
