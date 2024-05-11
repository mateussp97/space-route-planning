import {
  fuelConsumptionRatio,
  fuelTankCapacity,
  planetDistances,
  refuelingStations,
} from "@/utils/constants";
import { atom, useAtom } from "jotai";
import { useCallback } from "react";

const currentPlanetAtom = atom<string>("Earth");
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

export function useSpaceTravelStore() {
  const [currentPlanet, setCurrentPlanet] = useAtom(currentPlanetAtom);
  const [destinationPlanet, setDestinationPlanet] = useAtom(
    destinationPlanetAtom
  );
  const [availableFuel, setAvailableFuel] = useAtom(availableFuelAtom);
  const [travelHistory, setTravelHistory] = useAtom(travelHistoryAtom);

  // Calcular combustível necessário e verificar se a viagem é possível
  const requiredFuel = destinationPlanet
    ? (planetDistances[`${currentPlanet}_${destinationPlanet}`] || 0) *
      fuelConsumptionRatio
    : 0;
  const isTripPossible = availableFuel >= requiredFuel;

  // Encontrar a estação de reabastecimento mais próxima se necessário
  const nearestRefuelStation = (() => {
    let closestStation = null;
    let minDistance = Infinity;
    Object.entries(refuelingStations).forEach(([station, distances]) => {
      const distance = distances[currentPlanet];
      if (distance < minDistance) {
        minDistance = distance;
        closestStation = station;
      }
    });
    return closestStation;
  })();

  // Submeter a viagem e atualizar o histórico
  const submitTrip = useCallback(() => {
    if (isTripPossible) {
      setCurrentPlanet(destinationPlanet);
      setAvailableFuel((prevFuel) => prevFuel - requiredFuel);
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
      setDestinationPlanet(""); // Resetar o destino após a viagem
    } else {
      alert("Não há combustível suficiente para a viagem!");
    }
  }, [
    isTripPossible,
    currentPlanet,
    destinationPlanet,
    availableFuel,
    requiredFuel,
  ]);

  return {
    currentPlanet,
    destinationPlanet,
    availableFuel,
    travelHistory,
    isTripPossible,
    nearestRefuelStation,
    requiredFuel,
    methods: {
      setDestinationPlanet,
      setAvailableFuel,
      submitTrip,
    },
  };
}
