'use client';
import { useEffect, useRef } from 'react';
import { useOnDemand } from '@/app/contexts/ondemand';
import { useRouter } from 'next/navigation';

const OndemandHandler = () => {
  const { onDemandId, onDemandStatus, onDemandRoomNick } = useOnDemand();
  const hasRedirected = useRef(false);
  const router = useRouter();

  useEffect(() => {
    console.log('OndemandHandler', { onDemandRoomNick, onDemandStatus });
    // Redirect only once when status becomes WAITING_USER
    if (onDemandStatus === 'WAITING_USER' && !hasRedirected.current) {
      hasRedirected.current = true;
      router.push(`/webcam/${onDemandRoomNick}?mode=vip`);
    }

    // Reset flag when onDemandRoomNick becomes null (new request)
    if (!onDemandRoomNick) {
      hasRedirected.current = false;
    }
  }, [onDemandRoomNick, onDemandStatus, router, hasRedirected]);
  return (
    <div className="bg-gray-300 p-4 rounded-md mt-2 w-1/4 text-sm">
      <p className="text-sm font-bold">On Demand</p>
      {!onDemandId && (
        <p className="text-gray-500">No on-demand request made yet.</p>
      )}
      {onDemandId && (
        <div className="text-black my-1">
          <p>
            On demand status: <b>{onDemandStatus}</b>
          </p>
        </div>
      )}
    </div>
  );
};

export default OndemandHandler;
