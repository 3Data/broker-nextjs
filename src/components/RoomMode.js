"use client";

import { useRoom } from "@/app/contexts/room";
import { twMerge } from "tailwind-merge";

export const RoomMode = ({ className }) => {
  const { roomMode } = useRoom();

  return (
    <span
      className={twMerge(
        "inline-block rounded-full text-xs py-0.5 px-2 font-semibold uppercase",
        roomMode === "offline" && "bg-slate-300",
        roomMode === "free" && "bg-emerald-300 text-emerald-800",
        roomMode === "private" && "bg-orange-500 text-orange-900",
        roomMode === "vip" && "bg-yellow-300 text-yellow-800",
        className
      )}
    >
      {roomMode}
    </span>
  );
};
