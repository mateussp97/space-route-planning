"use client";

import Collapse from "@/components/global/collapse";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import { useSpaceTravelStore } from "@/atoms/stores/useSpaceTravelStore";
import { fuelTankCapacity, refuelingStations } from "@/utils/constants";

import { toast } from "@/components/ui/use-toast";
import { TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";

export default function RefuelAlert() {
  const {
    isStranded,
    currentPlanet,
    availableFuel,
    methods: { refuel },
  } = useSpaceTravelStore();
  const t = useTranslations("home");

  function handleRefuel() {
    if (isStranded) {
      toast({
        variant: "positive",
        title: t("emergency-refueling"),
        description: t(
          "assistance-has-arrived-and-your-spaceship-has-been-refueled"
        ),
      });
      refuel();
      return;
    }
    toast({
      variant: "positive",
      title: t("refuel-successful"),
      description: t("your-spaceship-has-been-successfully-refueled"),
    });
    refuel();
  }

  return (
    <Collapse
      isOpen={
        isStranded ||
        (availableFuel !== fuelTankCapacity &&
          refuelingStations.includes(currentPlanet))
      }
    >
      <Alert
        variant="default"
        className="w-full h-fit mb-8 flex items-center justify-between gap-4 sm:gap-8 flex-col sm:flex-row"
      >
        <div className="w-fit flex flex-col items-start gap-2">
          <div className="w-fit flex gap-2">
            <TriangleAlert className="h-4 w-4" />
            <AlertTitle>
              {t(
                isStranded
                  ? "you-are-stranded"
                  : "you-are-on-a-planet-that-has-a-fuel-station"
              )}
            </AlertTitle>
          </div>
          <AlertDescription className="text-muted-foreground">
            {t(
              isStranded
                ? "you-cannot-reach-any-refueling-station-or-other-planets-with-the-remaining-fuel"
                : "click-on-the-button-to-execute-the-refueling-action-on-the-spaceship"
            )}
          </AlertDescription>
        </div>

        <Button
          onClick={handleRefuel}
          variant="secondary"
          className="w-full sm:w-fit"
        >
          {t(isStranded ? "ask-for-help" : "refuel-the-spaceship")}
        </Button>
      </Alert>
    </Collapse>
  );
}
