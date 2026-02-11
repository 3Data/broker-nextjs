'use client';

import { useOnDemand } from '@/app/contexts/ondemand';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

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
    <div>
      {!onDemandId && <p>No on-demand request made yet.</p>}
      {onDemandId && (
        <div>
          <p>On demand ID: {onDemandId}</p>
          <p>On demand status: {onDemandStatus}</p>
        </div>
      )}
    </div>
  );
};

export default OndemandHandler;
