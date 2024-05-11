interface PlanetDistances {
  [key: string]: number;
}

export const planetDistances: PlanetDistances = {
  // Mercury_Venus: 50000000, // Distance in kilometers
  // Venus_Earth: 40000000,
  // Earth_Mars: 60000000,
  // Mars_Jupiter: 350000000,
  // Jupiter_Saturn: 700000000,
  // Saturn_Uranus: 900000000,
  Mercury_Venus: 50000000,
  Venus_Mercury: 50000000,
  Mercury_Earth: 90000000,
  Earth_Mercury: 90000000,
  Mercury_Mars: 150000000,
  Mars_Mercury: 150000000,
  Mercury_Jupiter: 500000000,
  Jupiter_Mercury: 500000000,
  Mercury_Saturn: 1200000000,
  Saturn_Mercury: 1200000000,
  Mercury_Uranus: 2100000000,
  Uranus_Mercury: 2100000000,
  Venus_Earth: 40000000,
  Earth_Venus: 40000000,
  Venus_Mars: 100000000,
  Mars_Venus: 100000000,
  Venus_Jupiter: 450000000,
  Jupiter_Venus: 450000000,
  Venus_Saturn: 1150000000,
  Saturn_Venus: 1150000000,
  Venus_Uranus: 2050000000,
  Uranus_Venus: 2050000000,
  Earth_Mars: 60000000,
  Mars_Earth: 60000000,
  Earth_Jupiter: 410000000,
  Jupiter_Earth: 410000000,
  Earth_Saturn: 1110000000,
  Saturn_Earth: 1110000000,
  Earth_Uranus: 2010000000,
  Uranus_Earth: 2010000000,
  Mars_Jupiter: 350000000,
  Jupiter_Mars: 350000000,
  Mars_Saturn: 1050000000,
  Saturn_Mars: 1050000000,
  Mars_Uranus: 1950000000,
  Uranus_Mars: 1950000000,
  Jupiter_Saturn: 700000000,
  Saturn_Jupiter: 700000000,
  Saturn_Uranus: 900000000,
  Uranus_Saturn: 900000000,
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

interface RefuelingStations {
  [key: string]: {
    [key: string]: number;
  };
}

// Lista de postos de reabastecimento e suas distâncias aos outros planetas
export const refuelingStations: RefuelingStations = {
  Mercury: { Earth: 91000000, Saturn: 1500000000, Uranus: 2400000000 },
  Earth: { Mercury: 91000000, Saturn: 1200000000, Uranus: 2600000000 },
  Saturn: { Mercury: 1500000000, Earth: 1200000000, Uranus: 900000000 },
  Uranus: { Mercury: 2400000000, Earth: 2600000000, Saturn: 900000000 },
};
