// app/contexts/ondemand.tsx
'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { checkOnDemand, requestOndemand } from '@/shared/api';

type OnDemandId = string | null;

interface OnDemandContextType {
  onDemandId: OnDemandId;
  setOnDemandId: (id: OnDemandId) => void;
  onDemandStatus: string | null;
  partnerToken?: string | null;
  setPartnerToken: (token: string | null) => void;
  onDemandRoomId?: number | null;
  NewOnDemand: (roomId: number, nick: string) => Promise<void>;
  onDemandRoomNick?: string | null;
}

const OnDemandContext = createContext<OnDemandContextType | undefined>(
  undefined
);

interface OnDemandProviderProps {
  children: ReactNode;
}

export const OnDemandProvider = ({ children }: OnDemandProviderProps) => {
  const [onDemandId, setOnDemandId] = useState<OnDemandId>(null);
  const [onDemandStatus, setOnDemandStatus] = useState<string | null>(null);
  const [partnerToken, setPartnerToken] = useState<string | null>(null);
  const [onDemandRoomId, setOnDemandRoomId] = useState<number | null>(null);
  const [onDemandRoomNick, setOnDemandRoomNick] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  //statuses that indicate the on-demand process is complete and we can stop polling
  const isFinalStatus = [
    'REJECTED',
    'ERROR',
    'ONGOING',
    'CANCELLED',
    'FINISHED',
    'EXPIRED',
  ];
  // Memoize check function to prevent recreating on every render
  const check = useCallback(
    async (id: OnDemandId) => {
      if (!id) return;

      if (!partnerToken) {
        console.warn('No partner token available for on-demand check');
        return;
      }
      const { data, error } = await checkOnDemand(id, partnerToken);
      console.log('check', { data, error, partnerToken });

      if (error) {
        console.error(
          `Error requesting on check ondemand: ${error.code} - ${error.error}`
        );
      } else if (data) {
        setOnDemandStatus(data.status);
      }
    },
    [partnerToken]
  );

  // Effect to handle the timer setup/teardown
  useEffect(() => {
    let isSubscribed = true;

    const startPolling = async () => {
      if (onDemandId && isSubscribed) {
        await check(onDemandId);
      }
    };

    // Clear existing timer if any
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Start new timer if onDemandId exists
    if (onDemandId) {
      console.log('Starting timer for onDemandId:', onDemandId);

      // Run immediately on start - but don't await in effect
      startPolling();

      // Then run every 2 seconds
      timerRef.current = setInterval(() => {
        startPolling();
      }, 2000);
    }

    // Cleanup function
    return () => {
      isSubscribed = false;
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [onDemandId, check]); // check is now memoized with useCallback

  // Separate effect to handle auto-stop when status is final
  useEffect(() => {
    if (isFinalStatus.includes(onDemandStatus || '')) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        console.log('Timer stopped - status:', onDemandStatus);
      }
    }
  }, [onDemandStatus]);

  const NewOnDemand = useCallback(
    async (roomId: number, nick: string) => {
      setOnDemandRoomId(roomId);
      setOnDemandRoomNick(nick);
      const { data, error } = await requestOndemand(roomId, partnerToken);
      console.log('ondemand', { data, error });
      if (error) {
        setOnDemandId(null);
        console.error(
          `Error requesting on demand: ${error.code} - ${error.error}`
        );
      } else {
        setOnDemandId(data.on_demand_id);
      }
    },
    [partnerToken]
  );

  return (
    <OnDemandContext.Provider
      value={{
        onDemandId,
        setOnDemandId,
        onDemandStatus,
        setPartnerToken,
        onDemandRoomId,
        onDemandRoomNick,
        NewOnDemand,
      }}
    >
      {children}
    </OnDemandContext.Provider>
  );
};

export const useOnDemand = () => {
  const context = useContext(OnDemandContext);
  if (context === undefined) {
    throw new Error('useOnDemand must be used within an OnDemandProvider');
  }
  return context;
};
