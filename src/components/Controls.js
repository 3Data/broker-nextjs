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
        {muted ? "Audio OFF" : "Audio ON"}
        <span className="max-md:hidden"> ({volume * 100}%)</span>
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
