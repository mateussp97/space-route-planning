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

const currentPlanetAtom = atom<string>("earth");
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

// Read-only atom to calculate the required fuel
const requiredFuelAtom = atom<number>((get) => {
  const currentPlanet = get(currentPlanetAtom);
  const destinationPlanet = get(destinationPlanetAtom);

  // Calculates the required fuel by multiplying the distance by the fuel consumption ratio.
  // If no destination is selected, the required fuel is zero.
  return destinationPlanet
    ? getDistance(currentPlanet, destinationPlanet) * fuelConsumptionRatio
    : 0;
});

// Read-only atom to check if the trip is possible
const isTripPossibleAtom = atom<boolean>((get) => {
  const availableFuel = get(availableFuelAtom);
  const requiredFuel = get(requiredFuelAtom);

  // Checks if the available fuel is enough for the trip.
  return availableFuel >= requiredFuel;
});

// Read-only atom to check if stranded
const isStrandedAtom = atom<boolean>((get) => {
  // Gets the current planet.
  const currentPlanet = get(currentPlanetAtom);
  // Gets the available fuel.
  const availableFuel = get(availableFuelAtom);

  // Checks if there is any refueling station within reach with the available fuel.
  const canReachAnyRefuelingStation = refuelingStations.some((station) => {
    const distanceToStation = getDistance(currentPlanet, station);
    return availableFuel >= distanceToStation * fuelConsumptionRatio;
  });

  // Checks if it can reach any other planet other than the current one.
  const canReachAnyPlanet = planets.some((planet) => {
    if (planet.name !== currentPlanet) {
      const distanceToPlanet = getDistance(currentPlanet, planet.name);
      return availableFuel >= distanceToPlanet * fuelConsumptionRatio;
    }
    return false;
  });

  // Returns true if it cannot reach any refueling station or other planet.
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

  const requiredFuel = useAtomValue(requiredFuelAtom);
  const isTripPossible = useAtomValue(isTripPossibleAtom);
  const isStranded = useAtomValue(isStrandedAtom);
  const lang = useAtomValue(langAtom);

  // Function to find the nearest refueling station.
  // Uses the getDistance function to calculate the distance between the current location and each available station,
  // excluding the possibility of the current planet being considered a refueling station.
  const nearestRefuelStation = (() => {
    // Initializes the variable that will store the closest station.
    let closestStation = null;
    // Sets the initial distance to infinity to ensure any real distance is shorter.
    let minDistance = Infinity;

    // Filters the refueling stations to exclude the current planet from the checks,
    // as we cannot consider the current planet as a refueling option.
    refuelingStations
      .filter((station) => station !== currentPlanet)
      .forEach((station) => {
        // Calculates the distance from the current planet to the iterated station.
        const distance = getDistance(currentPlanet, station);

        // If the calculated distance is shorter than the shortest distance found so far,
        // updates the shortest distance and the closest station.
        if (distance < minDistance) {
          minDistance = distance;
          closestStation = station;
        }
      });

    // Returns the closest station found or null if none are accessible.
    return closestStation;
  })();

  // Executes the trip if possible, updates the history, and shows a relevant notification.
  const submitTrip = useCallback(() => {
    if (isTripPossible) {
      // Updates the current location to the chosen destination.
      setCurrentPlanet(destinationPlanet);
      // Deducts the required fuel from the available fuel.
      setAvailableFuel((prevFuel) => prevFuel - requiredFuel);
      // Adds the current trip to the travel history.
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
      // Displays a success notification.
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
      // Resets the selected destination after the trip.
      setDestinationPlanet("");
      return true;
    } else {
      // Displays an error notification if the trip is not possible.
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
      return false;
    }
  }, [
    isTripPossible,
    currentPlanet,
    destinationPlanet,
    availableFuel,
    requiredFuel,
  ]);

  // Refuels the tank to its maximum capacity.
  const refuel = useCallback(() => {
    setAvailableFuel(fuelTankCapacity);
  }, [currentPlanet]);

  // Função de restart: Limpa o histórico, reseta o combustível e mantém o planeta atual
  const restart = useCallback(() => {
    setCurrentPlanet("earth");
    setDestinationPlanet("");
    setAvailableFuel(fuelTankCapacity);
    setTravelHistory([]);
    toast({
      variant: "positive",
      title: "Restart Successful",
      description:
        "The game has been restarted. All travel history has been cleared.",
    });
  }, []);

  // Função de undo: Desfaz a última viagem feita
  const undoLastTrip = useCallback(() => {
    setTravelHistory((prevHistory) => {
      if (prevHistory.length === 0) return prevHistory;

      // Ordena o histórico de viagens por data de criação, do mais recente para o mais antigo.
      const sortedHistory = [...prevHistory].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );

      // Obtém a última viagem do histórico ordenado.
      const lastTrip = sortedHistory[0];

      // Atualiza o planeta atual e o combustível disponível com os valores da última viagem.
      setCurrentPlanet(lastTrip.currentPlanet);
      setAvailableFuel(lastTrip.availableFuel);
      toast({
        variant: "positive",
        title: "Undo Successful",
        description: `Undid the last trip from ${lastTrip.destinationPlanet} to ${lastTrip.currentPlanet}.`,
      });

      // Retorna o histórico de viagens sem a última viagem.
      return sortedHistory.slice(1);
    });
  }, [setCurrentPlanet, setAvailableFuel]);

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
      setCurrentPlanet,
      setDestinationPlanet,
      setAvailableFuel,
      setTravelHistory,
      submitTrip,
      refuel,
      restart,
      undoLastTrip,
    },
  };
}
