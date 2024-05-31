"use client";

import { useSpaceTravelStore } from "@/atoms/stores/useSpaceTravelStore";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

interface SpaceshipImgProps {
  planetName: string;
}

export default function SpaceshipImg({ planetName }: SpaceshipImgProps) {
  const { currentPlanet } = useSpaceTravelStore();
  const t = useTranslations("home");

  if (planetName === currentPlanet) {
    return (
      <motion.img
        layoutId="spaceship"
        src="/spaceship.png"
        alt="Spaceship"
        className="w-14 h-fit object-contain absolute top-0"
      />
    );
  }

  return <Fragment />;
}
