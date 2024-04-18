"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Communicator } from "@pw2016/pw-player-communicator";

import { Input } from "./Input";
import { Messages } from "./Messages";

export const Chat = ({ sessionToken, className }) => {
  const [messages, setMessages] = useState([]);
  const [communicator, setCommunicator] = useState(null);

  const onChatMessage = (message) => {
    setMessages((current) => [...current, message]);
  };

  useEffect(() => {
    setCommunicator(new Communicator({ sessionToken }));
  }, [sessionToken]);

  useEffect(() => {
    if (!communicator) return;
    communicator.on("chatMessage", onChatMessage);

    return () => {
      communicator.off("chatMessage", onChatMessage);
    };
  }, [communicator]);

  const sendMessage = (message) => {
    if (!communicator) return;
    communicator.sendMessage(message);
  };

  return (
    <div
      className={twMerge(
        "flex flex-col gap-1 rounded-md bg-slate-200 p-1 max-h-full absolute inset-0",
        className
      )}
    >
      <Messages messages={messages} />
      <Input sendMessage={sendMessage} />
    </div>
  );
};
