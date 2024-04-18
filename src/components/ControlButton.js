import { twMerge } from "tailwind-merge";

export const ControlButton = ({ className, children, ...props }) => (
  <button
    className={twMerge(
      "bg-slate-300 hover:enabled:bg-slate-400 text-slate-800 px-2 py-1 rounded text-xs font-semibold disabled:opacity-50 transition",
      className
    )}
    {...props}
  >
    {children}
  </button>
);
