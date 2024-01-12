import Image from "next/image";
import Link from "next/link";

export const RoomItem = ({ room }) => {
  return (
    <Link
      href={`/webcam/${room.nick}`}
      className="flex gap-4 items-center bg-slate-100 hover:bg-slate-200 p-2 rounded"
      prefetch={false}
    >
      <Image
        src={room.thumb}
        width={64}
        height={64}
        className="rounded-full w-16 h-16 object-cover"
        alt=""
      />
      <div className="overflow-hidden">
        <h1 className="truncate">{room.nick}</h1>
        <p className="text-xs truncate">
          {room.age} - {room.roomMode}
        </p>
      </div>
    </Link>
  );
};
