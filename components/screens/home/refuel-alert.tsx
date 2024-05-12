"use client";

import { useSpaceTravelStore } from "@/atoms/stores/useSpaceTravelStore";
import Collapse from "@/components/global/collapse";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { fuelTankCapacity, refuelingStations } from "@/utils/constants";

import { TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";

export default function RefuelAlert() {
  const {
    currentPlanet,
    availableFuel,
    methods: { refuel },
  } = useSpaceTravelStore();
  const t = useTranslations("home");

  return (
    <Collapse
      isOpen={
        availableFuel !== fuelTankCapacity &&
        refuelingStations.includes(currentPlanet)
      }
    >
      <Alert
        variant="default"
        className="w-full h-fit mb-8 flex items-center justify-between"
      >
        <div className="w-fit flex flex-col items-start gap-2">
          <div className="w-fit flex gap-2">
            <TriangleAlert className="h-4 w-4" />
            <AlertTitle>
              {t("you-are-on-a-planet-that-has-a-fuel-station")}
            </AlertTitle>
          </div>
          <AlertDescription className="text-muted-foreground">
            {t(
              "click-on-the-button-to-execute-the-refueling-action-on-the-spaceship"
            )}
          </AlertDescription>
        </div>

        <Button onClick={refuel} variant="secondary">
          {t("refuel-the-spaceship")}
        </Button>
      </Alert>
    </Collapse>
  );
}
