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

// Function to calculate the distance between two specified planets.
export function getDistance(from: string, to: string): number {
  // If the origin and destination planets are the same, the distance is zero.
  if (from === to) return 0;

  // List of planets ordered from the closest to the farthest from the sun.
  const planets = [
    "mercury",
    "venus",
    "earth",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
  ];

  // Find the indices of the origin and destination planets in the ordered list.
  const startIndex = planets.indexOf(from);
  const endIndex = planets.indexOf(to);

  // Variable to accumulate the total distance between the planets.
  let distance = 0;

  // Check if the starting point is before the destination point in the planet list.
  if (startIndex < endIndex) {
    // Iterate through the planet list from the starting point to the destination, summing the distances between consecutive planets.
    for (let i = startIndex; i < endIndex; i++) {
      distance += planetDistances[`${planets[i]}_${planets[i + 1]}`];
    }
  } else {
    // Iterate through the planet list from the starting point to the destination, summing the distances between consecutive planets in reverse order.
    for (let i = startIndex; i > endIndex; i--) {
      distance += planetDistances[`${planets[i - 1]}_${planets[i]}`];
    }
  }

  // Return the calculated total distance.
  return distance;
}
