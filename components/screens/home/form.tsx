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

import Image from "next/image";

export default function Form() {
  const {
    currentPlanet,
    destinationPlanet,
    isTripPossible,
    methods: { setDestinationPlanet, submitTrip },
  } = useSpaceTravelStore();

  return (
    <fieldset className="grid gap-6 rounded-lg border p-4">
      <legend className="-ml-1 px-1 text-sm font-medium">Form</legend>
      <div className="grid gap-3">
        <Label htmlFor="model">Current Location:</Label>
        <Select value={currentPlanet} disabled>
          <SelectTrigger
            id="model"
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
                    <p>{planet.name}</p>
                    <p className="text-xs" data-description>
                      {planet.description}
                    </p>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="model">Destination:</Label>
        <Select value={destinationPlanet} onValueChange={setDestinationPlanet}>
          <SelectTrigger
            id="model"
            className="items-start [&_[data-description]]:hidden"
          >
            <SelectValue placeholder="Select a model" />
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
                      <p>{planet.name}</p>
                      <p className="text-xs" data-description>
                        {planet.description}
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
        Make the journey
      </Button>
    </fieldset>
  );
}
