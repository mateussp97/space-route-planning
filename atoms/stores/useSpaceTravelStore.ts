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
  // Obtém o planeta atual.
  const currentPlanet = get(currentPlanetAtom);
  // Obtém o combustível disponível.
  const availableFuel = get(availableFuelAtom);

  // Verifica se há alguma estação de reabastecimento ao alcance com o combustível disponível.
  const canReachAnyRefuelingStation = refuelingStations.some((station) => {
    const distanceToStation = getDistance(currentPlanet, station);
    return availableFuel >= distanceToStation * fuelConsumptionRatio;
  });

  // Verifica se pode alcançar qualquer outro planeta que não seja o atual.
  const canReachAnyPlanet = planets.some((planet) => {
    if (planet.name !== currentPlanet) {
      const distanceToPlanet = getDistance(currentPlanet, planet.name);
      return availableFuel >= distanceToPlanet * fuelConsumptionRatio;
    }
    return false;
  });

  // Retorna true se não puder alcançar nenhuma estação de reabastecimento ou outro planeta.
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

  // Calcula o combustível necessário multiplicando a distância pelo consumo de combustível.
  // Se nenhum destino for selecionado, o combustível necessário é zero.
  const requiredFuel = destinationPlanet
    ? getDistance(currentPlanet, destinationPlanet) * fuelConsumptionRatio
    : 0;

  // Verifica se o combustível disponível é suficiente para a viagem.
  const isTripPossible = availableFuel >= requiredFuel;

  // Função para encontrar a estação de reabastecimento mais próxima.
  // Usa a função getDistance para calcular a distância entre a localização atual e cada estação disponível,
  // excluindo a possibilidade do planeta atual ser considerado uma estação de reabastecimento.
  const nearestRefuelStation = (() => {
    // Inicializa a variável que vai armazenar a estação mais próxima.
    let closestStation = null;
    // Define a distância inicial como infinita para garantir que qualquer distância real seja menor.
    let minDistance = Infinity;

    // Filtra as estações de reabastecimento para excluir o planeta atual da lista de verificações,
    // pois não podemos considerar o planeta atual como uma opção de reabastecimento.
    refuelingStations
      .filter((station) => station !== currentPlanet)
      .forEach((station) => {
        // Calcula a distância do planeta atual até a estação que está sendo iterada.
        const distance = getDistance(currentPlanet, station);

        // Se a distância calculada for menor que a menor distância encontrada até agora,
        // atualiza a menor distância e a estação mais próxima.
        if (distance < minDistance) {
          minDistance = distance;
          closestStation = station;
        }
      });

    // Retorna a estação mais próxima encontrada ou null se nenhuma for acessível.
    return closestStation;
  })();

  // Executa a viagem se possível, atualiza o histórico e mostra uma notificação relevante.
  const submitTrip = useCallback(() => {
    if (isTripPossible) {
      // Atualiza a localização atual para o destino escolhido.
      setCurrentPlanet(destinationPlanet);
      // Deduz o combustível necessário do combustível disponível.
      setAvailableFuel((prevFuel) => prevFuel - requiredFuel);
      // Adiciona a viagem atual ao histórico de viagens.
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
      // Exibe uma notificação de sucesso.
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
      // Reseta o destino selecionado após a viagem.
      setDestinationPlanet("");
    } else {
      // Exibe uma notificação de erro se a viagem não for possível.
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

  // Reabastece o tanque até a sua capacidade máxima.
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
