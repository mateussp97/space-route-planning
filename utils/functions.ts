import dayjs from "dayjs";
import { planetDistances, planets } from "./constants";

export function formatDateAndTime(date: Date): [string, string] {
  const dayjsDate = dayjs(date);
  const formattedDate = dayjsDate.format("MM/DD/YYYY");
  const formattedTime = dayjsDate.format("HH:mm A");
  return [formattedDate, formattedTime];
}

export function getPlanetIcon(planetName: string): string | undefined {
  const planet = planets.find(
    (p) => p.name.toLowerCase() === planetName.toLowerCase()
  );
  return planet?.icon;
}

export function formatNumber(number: number, lang: string) {
  const locale: { [key: string]: string } = {
    en: "en-US",
    pt: "pt-BR",
  };

  return new Intl.NumberFormat(locale[lang]).format(number);
}

// Função para calcular a distância entre dois planetas especificados.
export function getDistance(from: string, to: string): number {
  // Se o planeta de origem e destino são o mesmo, a distância é zero.
  if (from === to) return 0;

  // Lista de planetas ordenada do mais próximo ao mais distante do sol.
  const planets = [
    "mercury",
    "venus",
    "earth",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
  ];

  // Encontra os índices dos planetas de origem e destino na lista ordenada.
  const startIndex = planets.indexOf(from);
  const endIndex = planets.indexOf(to);

  // Variável para acumular a distância total entre os planetas.
  let distance = 0;

  // Calcula a distância se o destino estiver após o planeta de origem na lista.
  if (startIndex < endIndex) {
    // Soma as distâncias entre os planetas consecutivos do ponto de origem até o destino.
    for (let i = startIndex; i < endIndex; i++) {
      distance += planetDistances[`${planets[i]}_${planets[i + 1]}`];
    }
  } else {
    // Calcula a distância se o destino estiver antes do planeta de origem na lista.
    for (let i = startIndex; i > endIndex; i--) {
      distance += planetDistances[`${planets[i - 1]}_${planets[i]}`];
    }
  }

  // Retorna a distância total calculada.
  return distance;
}
