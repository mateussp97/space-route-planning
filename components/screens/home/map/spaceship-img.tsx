"use client";

import { useSpaceTravelStore } from "@/atoms/stores/useSpaceTravelStore";
import { motion } from "framer-motion";
import { Fragment } from "react";

interface SpaceshipImgProps {
  planetName: string;
}

export default function SpaceshipImg({ planetName }: SpaceshipImgProps) {
  const { currentPlanet } = useSpaceTravelStore();

  if (planetName === currentPlanet) {
    return (
      <motion.img
        layoutId="spaceship"
        src="/spaceship.png"
        alt="Spaceship"
        className="w-14 h-fit object-contain absolute top-0"
        data-testid={`components.screens.home.map.spaceship-img.${planetName}`}
      />
    );
  }

  return <Fragment />;
}
