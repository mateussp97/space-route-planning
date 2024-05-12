import {
  fuelConsumptionRatio,
  fuelTankCapacity,
  planets,
  refuelingStations,
} from "@/utils/constants";
import { getDistance } from "@/utils/functions";
import { atom, useAtom, useAtomValue } from "jotai";
import { useCallback } from "react";

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
  const currentPlanet = get(currentPlanetAtom);
  const availableFuel = get(availableFuelAtom);
  const canReachAnyRefuelingStation = refuelingStations.some((station) => {
    const distanceToStation = getDistance(currentPlanet, station);
    return availableFuel >= distanceToStation * fuelConsumptionRatio;
  });

  // Verifica também se pode chegar a qualquer outro planeta
  const canReachAnyPlanet = planets.some((planet) => {
    if (planet.name !== currentPlanet) {
      const distanceToPlanet = getDistance(currentPlanet, planet.name);
      return availableFuel >= distanceToPlanet * fuelConsumptionRatio;
    }
    return false;
  });

  return !(canReachAnyRefuelingStation || canReachAnyPlanet);
});

export function useSpaceTravelStore() {
  const [currentPlanet, setCurrentPlanet] = useAtom(currentPlanetAtom);
  const [destinationPlanet, setDestinationPlanet] = useAtom(
    destinationPlanetAtom
  );
  const [availableFuel, setAvailableFuel] = useAtom(availableFuelAtom);
  const [travelHistory, setTravelHistory] = useAtom(travelHistoryAtom);
  const isStranded = useAtomValue(isStrandedAtom);

  // Calcular combustível necessário e verificar se a viagem é possível
  const requiredFuel = destinationPlanet
    ? getDistance(currentPlanet, destinationPlanet) * fuelConsumptionRatio
    : 0;
  const isTripPossible = availableFuel >= requiredFuel;

  // Encontrar a estação de reabastecimento mais próxima usando a função getDistance
  const nearestRefuelStation = (() => {
    let closestStation = null;
    let minDistance = Infinity;

    refuelingStations
      .filter((p) => p !== currentPlanet)
      .forEach((station) => {
        const distance = getDistance(currentPlanet, station);
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
    }
  }, [
    isTripPossible,
    currentPlanet,
    destinationPlanet,
    availableFuel,
    requiredFuel,
  ]);

  // Função para abastecer
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
