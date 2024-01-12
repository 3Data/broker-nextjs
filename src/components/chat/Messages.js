export const Messages = ({ messages = [] }) => {
  return (
    <ol className="space-y-1 min-h-[200px]">
      {messages.map((message, index) => (
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
