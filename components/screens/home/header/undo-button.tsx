"use client";
import { useSpaceTravelStore } from "@/atoms/stores/useSpaceTravelStore";
import { Button } from "@/components/ui/button";

export default function UndoButton() {
  const {
    travelHistory,
    methods: { undoLastTrip },
  } = useSpaceTravelStore();

  if (travelHistory.length === 0) return null;

  return (
    <Button variant="outline" size="sm" onClick={undoLastTrip}>
      Undo
    </Button>
  );
}
