"use client";

import { useRoom } from "@/app/contexts/room";

import { RoomMode } from "@/components/RoomMode";

export const Video = ({ src }) => {
  const { disconnectionReason } = useRoom();

  if (disconnectionReason) {
    return (
      <div className="w-full rounded-md rounded-b-none bg-black aspect-video flex items-center justify-center text-white p-4">
        <h2 className="text-center">Desconectado: {disconnectionReason}</h2>
      </div>
    );
  }

  return (
    <div className="relative">
      <RoomMode className="absolute top-2 right-2" />
      <iframe
        name="video-frame"
        src={src}
        className="w-full rounded-md rounded-b-none bg-black aspect-video"
        allow="geolocation;microphone;camera;autoplay;fullscreen"
      />
    </div>
  );
};
