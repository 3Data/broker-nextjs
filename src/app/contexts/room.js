"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Communicator } from "@pw2016/pw-player-communicator";

const Room = createContext();

export const RoomProvider = ({
  children,
  sessionToken,
  defaultMode = "offline",
}) => {
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [roomMode, setRoomMode] = useState(defaultMode);

  const [communicator, setCommunicator] = useState(null);

  useEffect(() => {
    setCommunicator(new Communicator({ sessionToken }));
  }, [sessionToken]);

  const toggleMute = () => setMuted(!muted);

  const goToGroupChat = () => {
    if (!communicator) return;
    communicator.goToGroupChat();
  };

  const onVideoPlay = useCallback(() => {
    setPlaying(true);
    communicator.setMuted(false);
    setVolume(1);
  }, [communicator]);

  useEffect(() => {
    setCommunicator(new Communicator({ sessionToken }));
  }, [sessionToken]);

  useEffect(() => {
    if (!communicator) return;
    communicator.on("videoPlay", onVideoPlay);
    communicator.on("roomModeUpdate", setRoomMode);

    return () => {
      communicator.off("videoPlay", onVideoPlay);
      communicator.off("roomModeUpdate", setRoomMode);
    };
  }, [communicator, onVideoPlay]);

  // Sync mute with communicator
  useEffect(() => {
    if (!communicator) return;
    communicator.setMuted(muted);
  }, [communicator, muted]);

  // Sync volume with communicator
  useEffect(() => {
    if (!communicator) return;
    communicator.setVolume(volume);
  }, [communicator, volume]);

  return (
    <Room.Provider
      value={{
        communicator,
        playing,
        muted,
        toggleMute,
        goToGroupChat,
        roomMode,
        volume,
        setVolume,
      }}
    >
      {children}
    </Room.Provider>
  );
};

export const useRoom = () => useContext(Room);
