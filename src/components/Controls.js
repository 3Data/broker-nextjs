"use client";

import { useRoom } from "@/app/contexts/room";

import { ControlButton } from "@/components/ControlButton";

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
  } = useRoom();

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="inline-block size-4"
            >
              <title>volume-mute</title>
              <path
                fill="currentColor"
                d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="inline-block size-4"
            >
              <title>volume-high</title>
              <path
                fill="currentColor"
                d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
              />
            </svg>
          )}
          <span>{volume * 100}%</span>
        </div>
      </ControlButton>
      <div className="grow" />
      {/* <ControlButton disabled={!playing}>
        Tip 1 cr.
      </ControlButton> */}
      <ControlButton onClick={goToGroupChat} disabled={privateDisabled}>
        Ir a privado
      </ControlButton>
      <ControlButton onClick={goToVIP} disabled={vipDisabled}>
        {requestingVIP ? "Solicitando..." : "Solicitar VIP"}
      </ControlButton>
    </div>
  );
};
