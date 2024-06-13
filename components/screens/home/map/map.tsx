import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { planets, refuelingStations } from "@/utils/constants";

import { Fuel } from "lucide-react";
import { useTranslations } from "next-intl";
import SpaceshipImg from "./spaceship-img";

export default function Map() {
  const t = useTranslations("home");

  return (
    <fieldset
      className="hidden md:grid gap-6 rounded-lg border p-4"
      data-testid="components.screens.home.map.map"
    >
      <legend className="-ml-1 px-1 text-sm font-medium">{t("map")}</legend>

      <div className="w-full flex items-center justify-between">
        {planets.map((planet) => (
          <div
            className="max-w-24 w-full pt-8 flex flex-col items-center gap-4 relative"
            key={t(planet.name)}
            data-testid={`components.screens.home.map.map.${planet.name}`}
          >
            <img
              className="w-full h-fit object-contain"
              src={planet.icon}
              alt={t(planet.name)}
              data-testid={`components.screens.home.map.map.${planet.name}-icon`}
            />

            {refuelingStations.includes(planet.name) ? (
              <Tooltip>
                <TooltipTrigger>
                  <h6 className="w-fit flex items-center gap-2">
                    {t(planet.name)} <Fuel size={16} />
                  </h6>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("it-has-a-fuel-station")}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <h6>{t(planet.name)}</h6>
            )}

            <SpaceshipImg planetName={planet.name} />
          </div>
        ))}
      </div>
    </fieldset>
  );
}
