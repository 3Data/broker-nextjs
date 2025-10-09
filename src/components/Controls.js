"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { useRoom } from "@/app/contexts/room";

import { ControlButton } from "@/components/ControlButton";

import {
  HatGlassesIcon,
  Volume2Icon,
  VolumeXIcon,
  WebcamIcon,
} from "lucide-react";

export const Controls = () => {
  const {
    muted,
    toggleMute,
    volume,
    setVolume,
    playing,
    goToGroupChat,
    goToVIP,
    roomMode,
    requestingVIP,
    activateUserCam,
    deactivateUserCam,
    userCamStatus,
  } = useRoom();

  const [spyModeEnabled, setSpyModeEnabled] = useState(false);

  const shareWebcamDisabled =
    !playing || (roomMode !== "private" && roomMode !== "vip");

  const privateDisabled =
    !playing || roomMode === "private" || roomMode === "vip" || requestingVIP;

  const vipDisabled = !playing || roomMode === "vip" || requestingVIP;

  return (
    <div className="bg-slate-200 p-1.5 rounded-md rounded-t-none flex items-center gap-1">
      <input
        type="range"
        min={0}
        max={1}
        step={0.1}
        disabled={!playing}
        className="accent-white h-1 w-16 max-sm:hidden"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
      />
      <ControlButton onClick={toggleMute} disabled={!playing}>
        <div className="flex items-center gap-1">
          {muted ? (
            <VolumeXIcon className="size-4" />
          ) : (
            <Volume2Icon className="size-4" />
          )}
          <span>{volume * 100}%</span>
        </div>
      </ControlButton>
      <div className="grow" />
      <ControlButton
        onClick={
          userCamStatus === "ready" ? deactivateUserCam : activateUserCam
        }
        disabled={shareWebcamDisabled}
        className={twMerge(
          userCamStatus === "ready" &&
            "bg-emerald-500 hover:enabled:bg-emerald-500"
        )}
      >
        <WebcamIcon className="size-4" />
      </ControlButton>
      <ControlButton onClick={goToGroupChat} disabled={privateDisabled}>
        Ir a privado
      </ControlButton>
      <ControlButton onClick={goToVIP} disabled={vipDisabled}>
        {requestingVIP ? "Solicitando..." : "Solicitar VIP"}
      </ControlButton>
      <ControlButton
        onClick={() => setSpyModeEnabled(!spyModeEnabled)}
        className={twMerge(
          spyModeEnabled && "bg-emerald-500 hover:enabled:bg-emerald-500"
        )}
      >
        <HatGlassesIcon className="size-4" />
      </ControlButton>
    </div>
  );
};
