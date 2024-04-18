export const Messages = ({ messages = [] }) => {
  return (
    <ol className="grow shrink overflow-auto flex flex-col-reverse gap-1">
      {[...messages].reverse().map((message, index) => (
        <li
          key={index}
          className="text-slate-600 bg-slate-100 p-2 text-xs rounded"
        >
          {JSON.stringify(message)}
        </li>
      ))}
    </ol>
  );
};
