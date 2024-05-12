"use client";

import { Separator } from "@/components/ui/separator";

import { useSpaceTravelStore } from "@/atoms/stores/useSpaceTravelStore";
import { formatDateAndTime, getPlanetIcon } from "@/utils/functions";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function TravelHistory() {
  const { travelHistory } = useSpaceTravelStore();
  const t = useTranslations("home");

  return (
    <div className="w-full h-fit relative flex flex-col rounded-xl">
      <fieldset className="w-full h-full md:h-[551px] grid gap-6 rounded-lg border p-4 overflow-y-auto">
        <legend className="-ml-1 px-1 text-sm font-medium">
          {t("travel-history")}
        </legend>

        <ul className="w-full flex flex-col gap-3">
          {travelHistory.map((travel, index) => {
            const [date, time] = formatDateAndTime(travel.createdAt);
            const travelCurrentPlanetIcon = getPlanetIcon(travel.currentPlanet);
            const travelDestinationPlanetIcon = getPlanetIcon(
              travel.destinationPlanet
            );

            return (
              <li key={index} className="w-full flex flex-col gap-3">
                <ul className="w-full flex flex-col gap-3">
                  <div className="w-full flex items-center justify-between">
                    <li className="flex items-center gap-2">
                      <p className="text-muted-foreground">{t("date")}:</p>
                      <p>{date}</p>
                    </li>

                    <li className="flex items-center gap-2">
                      <p className="text-muted-foreground">{t("time")}:</p>
                      <p>{time}</p>
                    </li>
                  </div>

                  <div className="w-full flex items-center justify-between">
                    <li className="flex items-center gap-2">
                      <p className="text-muted-foreground">{t("from")}:</p>
                      <p className="flex items-center gap-2">
                        {travelCurrentPlanetIcon && (
                          <Image
                            src={travelCurrentPlanetIcon}
                            alt={t(travel.currentPlanet)}
                            width={20}
                            height={20}
                          />
                        )}
                        {t(travel.currentPlanet)}
                      </p>
                    </li>

                    <li className="flex items-center gap-2">
                      <p className="text-muted-foreground">{t("to")}:</p>
                      <p className="flex items-center gap-2">
                        {travelDestinationPlanetIcon && (
                          <Image
                            src={travelDestinationPlanetIcon}
                            alt={t(travel.destinationPlanet)}
                            width={20}
                            height={20}
                          />
                        )}
                        {t(travel.destinationPlanet)}
                      </p>
                    </li>
                  </div>

                  <li className="flex items-center justify-between">
                    <p className="text-muted-foreground">
                      {t("fuel-before-travel")}:
                    </p>
                    <p>{travel.availableFuel}L</p>
                  </li>

                  <li className="flex items-center justify-between">
                    <p className="text-muted-foreground">{t("spent-fuel")}:</p>
                    <p>{travel.requiredFuel}L</p>
                  </li>
                </ul>
                {index + 1 !== travelHistory.length && (
                  <Separator className="my-2" />
                )}
              </li>
            );
          })}
        </ul>
      </fieldset>
    </div>
  );
}
