"use client";

import { useRoom } from "@/app/contexts/room";

export const Controls = () => {
  const {
    muted,
    toggleMute,
    volume,
    setVolume,
    playing,
    goToGroupChat,
    roomMode,
  } = useRoom();

  return (
    <div className="bg-slate-700 p-2 rounded-lg flex items-center gap-2">
      <input
        type="range"
        min={0}
        max={1}
        step={0.1}
        disabled={!playing}
        className="accent-pink-500 h-1 w-16"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
      />
      <button
        className="bg-slate-200 text-slate-800 px-2 py-1 rounded text-xs font-semibold disabled:opacity-50"
        onClick={toggleMute}
        disabled={!playing}
      >
        {muted ? "Audio OFF" : "Audio ON"} ({volume * 100}%)
      </button>
      <div className="grow" />
      <button
        className="bg-slate-200 text-slate-800 px-2 py-1 rounded text-xs font-semibold disabled:opacity-50"
        onClick={goToGroupChat}
        disabled={!playing || roomMode === "private"}
      >
        Ir a privado
      </button>
    </div>
  );
};
