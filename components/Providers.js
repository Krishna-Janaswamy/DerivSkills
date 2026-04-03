'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState, useRef } from 'react';

const CloudSyncContext = createContext();

export function useCloudSync() {
  return useContext(CloudSyncContext);
}

function CloudSyncMaster({ children }) {
  const { status } = useSession();
  
  const [learningData, setLearningData] = useState({
    activePlans: {},
    subtopicProgress: {},
    subtopicTimeTracker: {}
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const initialFetchDone = useRef(false);

  // Phase 1: Native Cloud Hydration into Memory
  useEffect(() => {
    if (status === 'loading') {
      setIsLoaded(false);
      return;
    }

    if (status === 'authenticated' && !initialFetchDone.current) {
      setIsLoaded(false);
      fetch('/api/sync')
        .then(r => r.json())
        .then(res => {
          if (res.learningData && Object.keys(res.learningData).length > 0) {
            setLearningData({
               activePlans: res.learningData.activePlans || {},
               subtopicProgress: res.learningData.subtopicProgress || {},
               subtopicTimeTracker: res.learningData.subtopicTimeTracker || {}
            });
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
      setLearningData({
        activePlans: {},
        subtopicProgress: {},
        subtopicTimeTracker: {}
      });
      setIsLoaded(true);
    }
  }, [status]);

  // Phase 2: Debounced Memory Sync to Postgres Engine
  const timeoutRef = useRef(null);
  
  const triggerSync = (newData) => {
    // 1. Update React Memory Instantly for 0.0ms UI Delay
    setLearningData(newData);
    
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
