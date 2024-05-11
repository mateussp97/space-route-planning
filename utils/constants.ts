interface PlanetDistances {
  [key: string]: number;
}

export const planetDistances: PlanetDistances = {
  Mercury_Venus: 50000000,
  Venus_Earth: 40000000,
  Earth_Mars: 60000000,
  Mars_Jupiter: 350000000,
  Jupiter_Saturn: 700000000,
  Saturn_Uranus: 900000000,
};

export const planets = [
  {
    icon: "./mercury.svg",
    name: "Mercury",
    description: "Closest planet to the Sun.",
  },
  {
    icon: "./venus.svg",
    name: "Venus",
    description: "Second planet from the Sun.",
  },
  {
    icon: "./earth.svg",
    name: "Earth",
    description: "Our home, blue and vibrant.",
  },
  {
    icon: "./mars.svg",
    name: "Mars",
    description: "The Red Planet, target for missions.",
  },
  {
    icon: "./jupiter.svg",
    name: "Jupiter",
    description: "Largest planet, a gas giant.",
  },
  {
    icon: "./saturn.svg",
    name: "Saturn",
    description: "Famous for its rings.",
  },
  {
    icon: "./uranus.svg",
    name: "Uranus",
    description: "Ice giant with a faint ring system.",
  },
];

export const fuelTankCapacity = 90000; // Capacidade do tanque em litros
export const fuelConsumptionRatio = 0.0001; // Consumo de combustível em litros por quilômetro

// Lista de planetas que têm estações de reabastecimento
export const refuelingStations = ["Mercury", "Earth", "Saturn", "Uranus"];
