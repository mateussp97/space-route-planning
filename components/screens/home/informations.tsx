"use client";

import Collapse from "@/components/global/collapse";
import FuelBar from "@/components/global/fuel-bar";
import { Separator } from "@/components/ui/separator";

import { useSpaceTravelStore } from "@/atoms/stores/useSpaceTravelStore";
import { fuelTankCapacity } from "@/utils/constants";
import { getPlanetIcon } from "@/utils/functions";

import Image from "next/image";

export default function Informations() {
  const {
    availableFuel,
    destinationPlanet,
    isTripPossible,
    nearestRefuelStation,
    requiredFuel,
  } = useSpaceTravelStore();

  const nearestRefuelingStationIcon =
    nearestRefuelStation && getPlanetIcon(nearestRefuelStation);
  const percentageOfFuelRemaining = (availableFuel * 100) / fuelTankCapacity;

  return (
    <fieldset className="grid rounded-lg border p-4">
      <legend className="-ml-1 px-1 text-sm font-medium">Informations</legend>

      <ul className="grid">
        <li className="flex flex-col gap-3">
          <span className="flex items-center justify-between">
            <p className="text-muted-foreground">Fuel Available:</p>
            <p>
              {availableFuel}L ({percentageOfFuelRemaining.toFixed(2)}%)
            </p>
          </span>

          <FuelBar percentageOfFuelUsed={100 - percentageOfFuelRemaining} />
        </li>
        <li className="pt-6 flex items-center justify-between">
          <p className="text-muted-foreground">Nearest Refueling Station:</p>
          <p className="flex items-center gap-2">
            {nearestRefuelingStationIcon && (
              <Image
                src={nearestRefuelingStationIcon}
                alt={nearestRefuelStation}
                width={20}
                height={20}
              />
            )}
            {nearestRefuelStation || "No refueling station nearby"}
          </p>
        </li>
      </ul>

      <Collapse isOpen={!!destinationPlanet}>
        <div className="grid pt-3 gap-3">
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Required Fuel</span>
              <span>{requiredFuel}L</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Can You Travel?</span>
              <span>{isTripPossible ? "Yes" : "No"}</span>
            </li>
          </ul>
        </div>
      </Collapse>
    </fieldset>
  );
}
