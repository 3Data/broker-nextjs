import { useState } from "react";

export const Input = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  const send = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={send}
      className="bg-slate-300 rounded-lg p-1 flex items-center gap-1 text-xs"
    >
      <input
        type="text"
        className="bg-white rounded py-2 px-3 grow min-w-0"
        placeholder="Tu mensaje"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="text-xs bg-slate-400 py-2 px-3 rounded text-slate-800 font-semibold">
        Enviar
      </button>
    </form>
  );
};
