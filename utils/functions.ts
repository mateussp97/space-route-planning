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

// Função para obter a distância entre quaisquer dois planetas.
export function getDistance(from: string, to: string): number {
  if (from === to) return 0; // Distância para o mesmo planeta é zero.

  // Ordene os planetas para sempre buscar no sentido Mercury -> Uranus.
  const planets = [
    "mercury",
    "venus",
    "earth",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
  ];
  const startIndex = planets.indexOf(from);
  const endIndex = planets.indexOf(to);

  // Calcula a distância somando as rotas consecutivas.
  let distance = 0;
  if (startIndex < endIndex) {
    for (let i = startIndex; i < endIndex; i++) {
      distance += planetDistances[`${planets[i]}_${planets[i + 1]}`];
    }
  } else {
    for (let i = startIndex; i > endIndex; i--) {
      distance += planetDistances[`${planets[i - 1]}_${planets[i]}`];
    }
  }
  return distance;
}
