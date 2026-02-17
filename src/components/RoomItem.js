'use client';

import Image from 'next/image';
import Link from 'next/link';
import { requestOndemand } from '@/shared/api';

import { useOnDemand } from '@/app/contexts/ondemand';
import { useEffect } from 'react';
export const RoomItem = ({ room, partnerToken }) => {
  const { setPartnerToken, NewOnDemand } = useOnDemand();
  useEffect(() => {
    if (!partnerToken) return;
    setPartnerToken(partnerToken);
  }, [partnerToken]);

  return (
    <Link
      href={`/webcam/${room.nick}`}
      className="flex gap-4 items-center bg-slate-100 hover:bg-slate-200 p-2 rounded-sm"
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
        {room.onDemand === 1 && (
          <button
            className="my-2 text-sm text-purple-800 cursor-pointer rounded-2xl border border-purple-800 bg-yellow-400 px-2 py-1 hover:bg-purple-700 hover:text-yellow-400"
            onClick={(e) => {
              e.preventDefault();
              NewOnDemand(room.id, room.nick);
            }}
          >
            Request on demand
          </button>
        )}
      </div>
    </Link>
  );
};
