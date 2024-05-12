"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSpaceTravelStore } from "@/atoms/stores/useSpaceTravelStore";
import { planets } from "@/utils/constants";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Form() {
  const {
    currentPlanet,
    destinationPlanet,
    isTripPossible,
    methods: { setDestinationPlanet, submitTrip },
  } = useSpaceTravelStore();
  const t = useTranslations("home");

  return (
    <fieldset className="grid gap-6 rounded-lg border p-4">
      <legend className="-ml-1 px-1 text-sm font-medium">{t("form")}</legend>
      <div className="grid gap-3">
        <Label htmlFor="current-location">{t("current-location")}:</Label>
        <Select value={currentPlanet} disabled>
          <SelectTrigger
            id="current-location"
            className="items-start [&_[data-description]]:hidden"
          >
            <SelectValue placeholder="Select a planet" />
          </SelectTrigger>
          <SelectContent>
            {planets.map((planet) => (
              <SelectItem key={planet.name} value={planet.name}>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Image
                    src={planet.icon}
                    alt={planet.name}
                    width={20}
                    height={20}
                  />
                  <div className="grid gap-0.5">
                    <p>{t(planet.name)}</p>
                    <p className="text-xs" data-description>
                      {t(planet.description)}
                    </p>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="destination">{t("destination")}:</Label>
        <Select value={destinationPlanet} onValueChange={setDestinationPlanet}>
          <SelectTrigger
            id="destination"
            className="items-start [&_[data-description]]:hidden"
          >
            <SelectValue placeholder="Select a planet" />
          </SelectTrigger>
          <SelectContent>
            {planets
              .filter((planet) => planet.name !== currentPlanet)
              .map((planet) => (
                <SelectItem key={planet.name} value={planet.name}>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <Image
                      src={planet.icon}
                      alt={planet.name}
                      width={20}
                      height={20}
                    />
                    <div className="grid gap-0.5">
                      <p>{t(planet.name)}</p>
                      <p className="text-xs" data-description>
                        {t(planet.description)}
                      </p>
                    </div>
                  </div>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="button"
        onClick={submitTrip}
        disabled={!isTripPossible || !destinationPlanet}
      >
        {t("make-the-journey")}
      </Button>
    </fieldset>
  );
}
