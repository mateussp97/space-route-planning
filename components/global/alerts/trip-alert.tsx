"use client";

import { useSpaceTravelStore } from "@/atoms/stores/useSpaceTravelStore";
import Informations from "@/components/screens/home/informations";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Fragment, ReactNode, useState } from "react";

interface TripAlertProps {
  children: ReactNode;
  destinationPlanet: string;
}

export function TripAlert({ children, destinationPlanet }: TripAlertProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    currentPlanet,
    methods: { setDestinationPlanet, submitTrip },
  } = useSpaceTravelStore();

  if (currentPlanet === destinationPlanet)
    return <Fragment>{children}</Fragment>;

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger
        onClick={() => {
          setDestinationPlanet(destinationPlanet);
          setIsOpen(true);
        }}
        asChild
      >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="w-full">
            <Informations isAlert />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setDestinationPlanet("");
              setIsOpen(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => (submitTrip() ? setIsOpen(false) : null)}
          >
            Make the journey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
