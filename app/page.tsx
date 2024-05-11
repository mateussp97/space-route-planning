"use client";
import { Bird, Rabbit, Settings, Share, Turtle } from "lucide-react";

import { useSpaceTravelStore } from "@/atoms/stores/useSpaceTravelStore";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { planets } from "@/utils/constants";
import Image from "next/image";

import LatitudeSh from "@/public/latitude-sh.svg";
import { Fragment } from "react";

function Block() {
  const {
    availableFuel,
    currentPlanet,
    destinationPlanet,
    isTripPossible,
    nearestRefuelStation,
    requiredFuel,
    travelHistory,
    methods: { setDestinationPlanet, submitTrip },
  } = useSpaceTravelStore();

  return (
    <Fragment>
      <div className="w-full h-fit relative flex-col items-start gap-8">
        <form className="grid w-full items-start gap-6">
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Form</legend>
            <div className="grid gap-3">
              <Label htmlFor="model">Localização Atual</Label>
              <Select value={currentPlanet} disabled>
                <SelectTrigger
                  id="model"
                  className="items-start [&_[data-description]]:hidden"
                >
                  <SelectValue placeholder="Select a planet" />
                </SelectTrigger>
                <SelectContent>
                  {planets.map((planet) => (
                    <SelectItem key={planet.name} value={planet.name}>
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <Image
                          src={planet.icon}
                          alt={planet.name}
                          width={20}
                          height={20}
                        />
                        <div className="grid gap-0.5">
                          <p>{planet.name}</p>
                          <p className="text-xs" data-description>
                            {planet.description}
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="model">Destino</Label>
              <Select
                value={destinationPlanet}
                onValueChange={setDestinationPlanet}
              >
                <SelectTrigger
                  id="model"
                  className="items-start [&_[data-description]]:hidden"
                >
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {planets
                    .filter((planet) => planet.name !== currentPlanet)
                    .map((planet) => (
                      <SelectItem key={planet.name} value={planet.name}>
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Image
                            src={planet.icon}
                            alt={planet.name}
                            width={20}
                            height={20}
                          />
                          <div className="grid gap-0.5">
                            <p>{planet.name}</p>
                            <p className="text-xs" data-description>
                              {planet.description}
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="button"
              onClick={submitTrip}
              disabled={!isTripPossible || !destinationPlanet}
            >
              Fazer viagem
            </Button>
          </fieldset>

          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Information
            </legend>

            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">availableFuel</span>
                <span>{availableFuel}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  nearestRefuelStation
                </span>
                <span>{nearestRefuelStation}</span>
              </li>
            </ul>
            <Separator className="my-2" />
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">requiredFuel</span>
                <span>{requiredFuel}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">isTripPossible</span>
                <span>{isTripPossible ? "sim" : "nao"}</span>
              </li>
            </ul>
          </fieldset>
        </form>
      </div>

      <div className="w-full h-full relative flex flex-col rounded-xl bg-muted/50">
        <fieldset className="w-full max-h-[535px] grid gap-6 rounded-lg border p-4 overflow-y-auto">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Historico de viagens
          </legend>

          {travelHistory.map((travel, index) => (
            <div key={index} className="w-full flex flex-col items-start">
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <p className="text-muted-foreground">date</p>
                  <p>{travel.createdAt.toString()}</p>
                </li>
                <li className="flex items-center justify-between">
                  <p className="text-muted-foreground">fuel before the trip</p>
                  <p>{travel.availableFuel}</p>
                </li>
                <div className="w-full flex items-center justify-between">
                  <li className="flex items-center justify-between">
                    <p className="text-muted-foreground">from</p>
                    <p>{travel.currentPlanet}</p>
                  </li>
                  <li className="flex items-center justify-between">
                    <p className="text-muted-foreground">to</p>
                    <p>{travel.destinationPlanet}</p>
                  </li>
                </div>
                <li className="flex items-center justify-between">
                  <p className="text-muted-foreground">spent fuel</p>
                  <p>{travel.requiredFuel}</p>
                </li>
              </ul>
              <Separator className="my-2" />
            </div>
          ))}
        </fieldset>
      </div>
    </Fragment>
  );
}

export default function Page() {
  return (
    <div className="w-full h-screen flex flex-col">
      <header className="w-full h-fit p-4 border-b bg-background flex items-center justify-between">
        <Image
          className="w-fit h-8 object-contain"
          src={LatitudeSh}
          alt="Latitude.sh white logo"
        />

        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Settings className="size-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[80vh]">
            <DrawerHeader>
              <DrawerTitle>Configuration</DrawerTitle>
              <DrawerDescription>
                Configure the settings for the model and messages.
              </DrawerDescription>
            </DrawerHeader>
            <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Settings
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="model">Model</Label>
                  <Select>
                    <SelectTrigger
                      id="model"
                      className="items-start [&_[data-description]]:hidden"
                    >
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="genesis">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Rabbit className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              Neural{" "}
                              <span className="font-medium text-foreground">
                                Genesis
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Our fastest model for general use cases.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="explorer">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Bird className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              Neural{" "}
                              <span className="font-medium text-foreground">
                                Explorer
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Performance and speed for efficiency.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="quantum">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Turtle className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              Neural{" "}
                              <span className="font-medium text-foreground">
                                Quantum
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              The most powerful model for complex computations.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="temperature">Temperature</Label>
                  <Input id="temperature" type="number" placeholder="0.4" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="top-p">Top P</Label>
                  <Input id="top-p" type="number" placeholder="0.7" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="top-k">Top K</Label>
                  <Input id="top-k" type="number" placeholder="0.0" />
                </div>
              </fieldset>
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Messages
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="assistant">Assistant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" placeholder="You are a..." />
                </div>
              </fieldset>
            </form>
          </DrawerContent>
        </Drawer>

        <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
          <Share className="size-3.5" />
          Share
        </Button>
      </header>

      <div className="w-full py-16 px-4 flex flex-col">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-2 gap-8">
          <Block />
        </div>
      </div>
    </div>
  );
}
