import { toast } from "@/components/ui/use-toast";
import {
  fuelConsumptionRatio,
  fuelTankCapacity,
  planets,
  refuelingStations,
} from "@/utils/constants";
import { formatNumber, getDistance } from "@/utils/functions";
import { atom, useAtom, useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { langAtom } from "../langAtom";

const currentPlanetAtom = atom<string>("jupiter");
const destinationPlanetAtom = atom<string>("");
const availableFuelAtom = atom<number>(fuelTankCapacity);

const travelHistoryAtom = atom<
  {
    currentPlanet: string;
    destinationPlanet: string;
    availableFuel: number;
    requiredFuel: number;
    createdAt: Date;
  }[]
>([]);
const isStrandedAtom = atom<boolean>((get) => {
  // Get the current planet.
  const currentPlanet = get(currentPlanetAtom);
  // Get the available fuel.
  const availableFuel = get(availableFuelAtom);

  // Check if there is any refueling station within reach with the available fuel.
  const canReachAnyRefuelingStation = refuelingStations.some((station) => {
    const distanceToStation = getDistance(currentPlanet, station);
    return availableFuel >= distanceToStation * fuelConsumptionRatio;
  });

  // Check if it can reach any other planet other than the current one.
  const canReachAnyPlanet = planets.some((planet) => {
    if (planet.name !== currentPlanet) {
      const distanceToPlanet = getDistance(currentPlanet, planet.name);
      return availableFuel >= distanceToPlanet * fuelConsumptionRatio;
    }
    return false;
  });

  // Return true if it cannot reach any refueling station or other planet.
  return !(canReachAnyRefuelingStation || canReachAnyPlanet);
});

export function useSpaceTravelStore() {
  const t = useTranslations("home");

  const [currentPlanet, setCurrentPlanet] = useAtom(currentPlanetAtom);
  const [destinationPlanet, setDestinationPlanet] = useAtom(
    destinationPlanetAtom
  );
  const [availableFuel, setAvailableFuel] = useAtom(availableFuelAtom);
  const [travelHistory, setTravelHistory] = useAtom(travelHistoryAtom);
  const isStranded = useAtomValue(isStrandedAtom);
  const lang = useAtomValue(langAtom);

  // Calculate the required fuel by multiplying the distance by the fuel consumption ratio.
  // If no destination is selected, the required fuel is zero.
  const requiredFuel = destinationPlanet
    ? getDistance(currentPlanet, destinationPlanet) * fuelConsumptionRatio
    : 0;

  // Determine if the available fuel is sufficient for the trip.
  const isTripPossible = availableFuel >= requiredFuel;

  // Function to find the nearest refueling station.
  // Uses the getDistance function to calculate the distance between the user's current location and each available station,
  // excluding the possibility of the current planet being considered a refueling station.
  const nearestRefuelStation = (() => {
    // Initialize the variable that will store the closest station.
    let closestStation = null;
    // Set the initial distance to infinity to ensure any real distance is smaller.
    let minDistance = Infinity;

    // Filter the refueling stations to exclude the user's current planet from the list of checks,
    // as we cannot consider the current planet as a refueling option.
    refuelingStations
      .filter((station) => station !== currentPlanet)
      .forEach((station) => {
        // Calculate the distance from the current planet to the station being iterated.
        const distance = getDistance(currentPlanet, station);

        // If the calculated distance is less than the smallest distance found so far,
        // update the smallest distance and the closest station.
        if (distance < minDistance) {
          minDistance = distance;
          closestStation = station;
        }
      });

    // Return the closest station found or null if none are accessible.
    return closestStation;
  })();

  // Execute the trip if possible, update the history and show a relevant toast.
  const submitTrip = useCallback(() => {
    if (isTripPossible) {
      // Update the current location to the chosen destination.
      setCurrentPlanet(destinationPlanet);
      // Deduct the required fuel from the available fuel.
      setAvailableFuel((prevFuel) => prevFuel - requiredFuel);
      // Add the current trip to the travel history.
      setTravelHistory((prevHistory) => [
        ...prevHistory,
        {
          currentPlanet,
          destinationPlanet,
          availableFuel,
          requiredFuel,
          createdAt: new Date(),
        },
      ]);
      // Display a success toast.
      toast({
        variant: "positive",
        title: t("trip-successful-title", {
          from: t(currentPlanet),
          to: t(destinationPlanet),
        }),
        description: t("trip-successful-description", {
          spentFuel: t("fuel-capacity-in-liters", {
            fuel: formatNumber(requiredFuel, lang),
          }),
          remainingFuel: t("fuel-capacity-in-liters", {
            fuel: formatNumber(availableFuel - requiredFuel, lang),
          }),
        }),
      });
      // Reset the selected destination after the trip.
      setDestinationPlanet("");
    } else {
      // Display an error toast if the trip is not possible.
      toast({
        variant: "destructive",
        title: t("trip-not-possible-title", {
          from: t(currentPlanet),
          to: t(destinationPlanet),
        }),
        description: t("trip-not-possible-description", {
          spentFuel: t("fuel-capacity-in-liters", {
            fuel: formatNumber(requiredFuel, lang),
          }),
          remainingFuel: t("fuel-capacity-in-liters", {
            fuel: formatNumber(availableFuel, lang),
          }),
        }),
      });
    }
  }, [
    isTripPossible,
    currentPlanet,
    destinationPlanet,
    availableFuel,
    requiredFuel,
  ]);

  // Refuel the tank up to its maximum capacity.
  const refuel = useCallback(() => {
    setAvailableFuel(fuelTankCapacity);
  }, [currentPlanet]);

  return {
    currentPlanet,
    destinationPlanet,
    availableFuel,
    travelHistory,
    isTripPossible,
    nearestRefuelStation,
    requiredFuel,
    isStranded,
    methods: {
      setDestinationPlanet,
      setAvailableFuel,
      submitTrip,
      refuel,
    },
  };
}
