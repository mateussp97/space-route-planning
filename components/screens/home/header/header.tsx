"use client";

import Link from "next/link";
import LanguageDropdown from "./language-dropdown";
import ShareDropdown from "./share-dropdown";

import LatitudeSh from "@/public/latitude-sh.svg";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations("home");

  return (
    <header className="w-full h-fit bg-transparent p-4 border-b flex items-center justify-between">
      <div className="max-w-7xl w-full h-fit mx-auto flex items-center justify-between">
        <div className="w-fit h-fit flex flex-col items-start gap-1">
          <Image
            className="w-fit h-6 object-contain"
            src={LatitudeSh}
            alt="Latitude.sh white logo"
          />
          <p className="flex gap-1 text-nowrap text-xs">
            {t("made-by")}
            <Link
              href="https://www.mateuspaula.dev/"
              target="_blank"
              className="relative overflow-hidden group"
            >
              <span className="invisible">mateuspaula.dev</span>
              <span className="text-muted-foreground absolute top-0 left-0 group-hover:-translate-y-full transition-transform ease-in-out duration-500 hover:duration-300">
                mateuspaula.dev
              </span>
              <span className="text-muted-foreground absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform ease-in-out duration-500 hover:duration-300">
                mateuspaula.dev
              </span>
            </Link>
          </p>
        </div>

        <div className="w-fit flex items-center gap-4">
          <LanguageDropdown locale={locale} />
          <ShareDropdown />
        </div>
      </div>
    </header>
  );
}
