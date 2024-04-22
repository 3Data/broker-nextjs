"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Communicator } from "@pw2016/pw-player-communicator";

import { Input } from "./Input";
import { Messages } from "./Messages";

export const Chat = ({ sessionToken, urlChat, className }) => {
  const [messages, setMessages] = useState([]);
  const [communicator, setCommunicator] = useState(null);
  const [showIframe, setShowIframe] = useState(false);

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
    <div className="h-full flex flex-col gap-1">
      <div className="grid grid-cols-2 gap-1 text-xs">
        <button
          onClick={() => setShowIframe(true)}
          className={twMerge(
            "p-1 rounded-md bg-slate-200",
            showIframe && "bg-slate-300"
          )}
        >
          Chat iframe
        </button>
        <button
          onClick={() => setShowIframe(false)}
          className={twMerge(
            "p-1 rounded-md bg-slate-200",
            !showIframe && "bg-slate-300"
          )}
        >
          Chat integration
        </button>
      </div>
      <div className="relative grow">
        <iframe
          name="chat-frame"
          src={urlChat}
          className={twMerge(
            "absolute w-full h-full bg-slate-200 rounded-md",
            !showIframe && "hidden"
          )}
        />
        <div
          className={twMerge(
            "flex flex-col gap-1 rounded-md bg-slate-200 p-1 max-h-full absolute inset-0",
            showIframe && "hidden",
            className
          )}
        >
          <Messages messages={messages} />
          <Input sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};
