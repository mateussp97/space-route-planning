interface PlanetDistances {
  [key: string]: number;
}

export const planetDistances: PlanetDistances = {
  mercury_venus: 50000000,
  venus_earth: 40000000,
  earth_mars: 60000000,
  mars_jupiter: 350000000,
  jupiter_saturn: 700000000,
  saturn_uranus: 900000000,
};

export const planets = [
  {
    icon: "./mercury.svg",
    name: "mercury",
    description: "mercury-description",
  },
  {
    icon: "./venus.svg",
    name: "venus",
    description: "venus-description",
  },
  {
    icon: "./earth.svg",
    name: "earth",
    description: "earth-description",
  },
  {
    icon: "./mars.svg",
    name: "mars",
    description: "mars-description",
  },
  {
    icon: "./jupiter.svg",
    name: "jupiter",
    description: "jupiter-description",
  },
  {
    icon: "./saturn.svg",
    name: "saturn",
    description: "saturn-description",
  },
  {
    icon: "./uranus.svg",
    name: "uranus",
    description: "uranus-description",
  },
];

export const fuelTankCapacity = 90000; // Capacidade do tanque em litros
export const fuelConsumptionRatio = 0.0001; // Consumo de combustível em litros por quilômetro

// Lista de planetas que têm estações de reabastecimento
export const refuelingStations = ["mercury", "earth", "saturn", "uranus"];

export const languages = [
  {
    title: "portuguese",
    icon: "/brasil.png",
    value: "pt",
  },
  {
    title: "english",
    icon: "/estados-unidos.png",
    value: "en",
  },
];

export const URL = "https://latitudesh-spaceship.vercel.app/";
