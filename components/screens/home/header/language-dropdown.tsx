"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { langAtom } from "@/atoms/langAtom";
import { Link, usePathname } from "@/navigation";
import { languages } from "@/utils/constants";

import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

interface LanguageDropdownProps {
  locale: string;
}

export default function LanguageDropdown({ locale }: LanguageDropdownProps) {
  const currentLanguage = languages.find(
    (language) => language.value === locale
  );
  const pathname = usePathname();
  const t = useTranslations("home");
  const setLang = useSetAtom(langAtom);

  useEffect(() => {
    setLang(locale);
  }, [locale]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
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
          <Link
            key={language.title}
            href={pathname}
            locale={language.value as "pt" | "en"}
          >
            <DropdownMenuItem className="w-full flex cursor-pointer">
              <img
                className="w-5 h-fit object-contain mr-2"
                src={language.icon}
                alt={t(language.title)}
              />
              {t(language.title)}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
