"use client";

// TODO: Refactor this code to use the new `useSpaceTravelStore` atom

import Collapse from "@/components/global/collapse";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import { useSpaceTravelStore } from "@/atoms/stores/useSpaceTravelStore";

import { toast } from "@/components/ui/use-toast";
import { wormholeFuelConsumptionRatio } from "@/utils/constants";
import { TriangleAlert } from "lucide-react";

export default function WormholeAlert() {
  const {
    currentPlanet,
    availableFuel,
    methods: {
      setAvailableFuel,
      setDestinationPlanet,
      setCurrentPlanet,
      setTravelHistory,
    },
  } = useSpaceTravelStore();

  const requiredFuel = 450000000 * wormholeFuelConsumptionRatio;

  function handleTrip() {
    if (availableFuel >= requiredFuel) {
      setCurrentPlanet(currentPlanet === "mercury" ? "saturn" : "mercury");
      setAvailableFuel((prevFuel) => prevFuel - requiredFuel);
      setTravelHistory((prevHistory) => [
        ...prevHistory,
        {
          currentPlanet,
          destinationPlanet: currentPlanet === "mercury" ? "saturn" : "mercury",
          availableFuel: availableFuel - requiredFuel,
          requiredFuel,
          createdAt: new Date(),
        },
      ]);
      toast({
        variant: "positive",
        title: "Trip successful",
        description: "You have successfully traveled through the wormhole.",
      });
      setDestinationPlanet("");
    } else {
      toast({
        variant: "destructive",
        title: "Insufficient fuel",
        description:
          "You don't have enough fuel to travel through the wormhole.",
      });
    }
  }

  return (
    <Collapse
      isOpen={currentPlanet === "mercury" || currentPlanet === "saturn"}
    >
      <Alert
        variant="default"
        className="w-full h-fit mb-8 flex items-center justify-between gap-4 sm:gap-8 flex-col sm:flex-row"
      >
        <div className="w-fit flex gap-2">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>
            You find yourself in a wormhole, you can travel directly to{" "}
            {currentPlanet === "mercury" ? "Saturn" : "Mercury"}.
          </AlertTitle>
        </div>

        <Button
          onClick={handleTrip}
          variant="secondary"
          className="w-full sm:w-fit"
        >
          Travel through wormhole
        </Button>
      </Alert>
    </Collapse>
  );
}
