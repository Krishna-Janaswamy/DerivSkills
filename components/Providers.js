'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { readLearningCache, writeLearningCache, clearLearningCache } from '@/src/utils/learning-cache';

const CloudSyncContext = createContext();

export function useCloudSync() {
  return useContext(CloudSyncContext);
}

function CloudSyncMaster({ children }) {
  const { data: session, status } = useSession();

  const emptyLearningData = {
    activePlans: {},
    subtopicProgress: {},
    subtopicTimeTracker: {},
    portfolioMeta: {},
    profileDetails: {}
  };
  
  const [learningData, setLearningData] = useState(emptyLearningData);
  const [isLoaded, setIsLoaded] = useState(false);
  const initialFetchDone = useRef(false);
  const userId = session?.user?.id;

  // Phase 1: Native Cloud Hydration into Memory
  useEffect(() => {
    if (status === 'loading') {
      setIsLoaded(false);
      return;
    }

    if (status === 'authenticated') {
      const cached = userId ? readLearningCache(userId) : null;
      if (cached) {
        setLearningData(cached);
        setIsLoaded(true);
      }
      setIsLoaded((prev) => prev || !!cached);
      fetch('/api/sync')
        .then(r => r.json())
        .then(res => {
          if (res.learningData && Object.keys(res.learningData).length > 0) {
            const updated = {
              activePlans: res.learningData.activePlans || {},
              subtopicProgress: res.learningData.subtopicProgress || {},
              subtopicTimeTracker: res.learningData.subtopicTimeTracker || {},
              portfolioMeta: res.learningData.portfolioMeta || {},
              profileDetails: res.learningData.profileDetails || {}
            };
            setLearningData(updated);
            if (userId) {
              writeLearningCache(userId, updated);
            }
          }
          initialFetchDone.current = true;
          setIsLoaded(true);
        })
        .catch(err => {
          console.error(err);
          setIsLoaded(true);
        });
    } else if (status === 'unauthenticated') {
      initialFetchDone.current = false;
      setLearningData(emptyLearningData);
      setIsLoaded(true);
      if (userId) {
        clearLearningCache(userId);
      }
    }
  }, [status, userId]);

  // Phase 2: Debounced Memory Sync to Postgres Engine
  const timeoutRef = useRef(null);
  
  const triggerSync = (newData) => {
    // 1. Update React Memory Instantly for 0.0ms UI Delay
    setLearningData(newData);

    if (userId) {
      writeLearningCache(userId, newData);
    }
    
    // 2. Transmit gracefully to Postgres Database avoiding rate-limits
    if (status === 'authenticated') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        fetch('/api/sync', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newData)
        }).catch(err => console.error("Cloud Sync Failed", err));
      }, 1500); // 1.5 seconds debounced push
    }
  };

  return (
    <CloudSyncContext.Provider value={{ learningData, triggerSync, isLoaded, status }}>
      {children}
    </CloudSyncContext.Provider>
  );
}

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <CloudSyncMaster>{children}</CloudSyncMaster>
    </SessionProvider>
  );
}
