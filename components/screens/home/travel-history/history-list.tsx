"use client";

import { Separator } from "@/components/ui/separator";

import { langAtom } from "@/atoms/langAtom";
import { useSpaceTravelStore } from "@/atoms/stores/useSpaceTravelStore";
import {
  formatDateAndTime,
  formatNumber,
  getPlanetIcon,
} from "@/utils/functions";

import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HistoryList() {
  const { travelHistory } = useSpaceTravelStore();
  const t = useTranslations("home");

  const lang = useAtomValue(langAtom);

  if (travelHistory.length > 0) {
    return (
      <ul
        className="w-full flex flex-col gap-3"
        data-testid="components.screens.home.travel-history.history-list"
      >
        {travelHistory
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .map((travel, index) => {
            const [date, time] = formatDateAndTime(travel.createdAt);
            const travelCurrentPlanetIcon = getPlanetIcon(travel.currentPlanet);
            const travelDestinationPlanetIcon = getPlanetIcon(
              travel.destinationPlanet
            );

            return (
              <li
                key={index}
                className="w-full flex flex-col gap-3"
                data-testid={`components.screens.home.travel-history.history-list.history-list-item-${index}`}
              >
                <ul className="w-full flex flex-col gap-3">
                  <div className="w-full flex items-center justify-between">
                    <li className="flex items-center gap-2">
                      <p className="text-muted-foreground">{t("date")}:</p>
                      <p
                        data-testid={`components.screens.home.travel-history.history-list.history-list-item-${index}-date`}
                      >
                        {date}
                      </p>
                    </li>

                    <li className="flex items-center gap-2">
                      <p className="text-muted-foreground">{t("time")}:</p>
                      <p
                        data-testid={`components.screens.home.travel-history.history-list.history-list-item-${index}-time`}
                      >
                        {time}
                      </p>
                    </li>
                  </div>

                  <div className="w-full flex items-center justify-between">
                    <li className="flex items-center gap-2">
                      <p className="text-muted-foreground">{t("from")}:</p>
                      <p
                        className="flex items-center gap-2"
                        data-testid={`components.screens.home.travel-history.history-list.history-list-item-${index}-from`}
                      >
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
                      <p
                        className="flex items-center gap-2"
                        data-testid={`components.screens.home.travel-history.history-list.history-list-item-${index}-to`}
                      >
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
                    <p
                      data-testid={`components.screens.home.travel-history.history-list.history-list-item-${index}-fuel-before-travel`}
                    >
                      {t("fuel-capacity-in-liters", {
                        fuel: formatNumber(travel.availableFuel, lang),
                      })}
                    </p>
                  </li>

                  <li className="flex items-center justify-between">
                    <p className="text-muted-foreground">{t("spent-fuel")}:</p>
                    <p
                      data-testid={`components.screens.home.travel-history.history-list.history-list-item-${index}-spent-fuel`}
                    >
                      {t("fuel-capacity-in-liters", {
                        fuel: formatNumber(travel.requiredFuel, lang),
                      })}
                    </p>
                  </li>
                </ul>
                {index + 1 !== travelHistory.length && (
                  <Separator className="my-2" />
                )}
              </li>
            );
          })}
      </ul>
    );
  }

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center text-center text-balance gap-2"
      data-testid="components.screens.home.travel-history.history-list.history-list-empty"
    >
      <h2 className="text-2xl font-semibold">
        {t("empty-travel-history-title")}
      </h2>
      <p className="text-muted-foreground">
        {t("empty-travel-history-description")}
      </p>
    </div>
  );
}
