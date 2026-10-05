"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type {
  TokenState,
  PoolState,
  FrontierEvent,
  WalletState,
  HookEvent,
  ObservatoryData,
} from "@/data/types";
import type { ChapterState } from "@/chapter/types";
import { MockFrontierProvider } from "@/data/mock-provider";
import { SolanaFrontierProvider } from "@/data/solana-provider";
import type { FrontierDataProvider } from "@/data/provider";

export type ProviderMode = "simulation" | "observed";

interface FrontierContextType {
  provider: FrontierDataProvider;
  providerMode: ProviderMode;
  setProviderMode: (mode: ProviderMode) => void;
  token: TokenState | null;
  chapter: ChapterState | null;
  pool: PoolState | null;
  events: FrontierEvent[];
  hookEvents: HookEvent[];
  observatory: ObservatoryData | null;
  isLoading: boolean;
  // Simulation Controls
  isSimulationMode: boolean;
  adjustVolume: (delta: number) => void;
  nextChapter: () => void;
  resetSimulation: () => void;
  triggerHookRejection: () => void;
  triggerRandomEvent: () => void;
  // Wallet lookup
  lookupWallet: (address: string) => Promise<WalletState>;
  // Manual refresh
  refresh: () => Promise<void>;
}

const FrontierContext = createContext<FrontierContextType | null>(null);

// Singleton provider instances
const mockProviderInstance = new MockFrontierProvider();
const solanaProviderInstance = new SolanaFrontierProvider();

export const FrontierProvider: React.FC<{
  children: React.ReactNode;
  initialMode?: ProviderMode;
}> = ({ children, initialMode = "simulation" }) => {
  const [providerMode, setProviderModeState] = useState<ProviderMode>(initialMode);

  const provider: FrontierDataProvider =
    providerMode === "observed" ? solanaProviderInstance : mockProviderInstance;

  const [token, setToken] = useState<TokenState | null>(null);
  const [chapter, setChapter] = useState<ChapterState | null>(null);
  const [pool, setPool] = useState<PoolState | null>(null);
  const [events, setEvents] = useState<FrontierEvent[]>([]);
  const [hookEvents, setHookEvents] = useState<HookEvent[]>([]);
  const [observatory, setObservatory] = useState<ObservatoryData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const [t, c, p, evs, hEvs, obs] = await Promise.all([
        provider.getToken(),
        provider.getChapter(),
        provider.getPool(),
        provider.getEvents(20),
        provider.getHookEvents(10),
        provider.getObservatoryData(),
      ]);
      setToken(t);
      setChapter(c);
      setPool(p);
      setEvents(evs);
      setHookEvents(hEvs);
      setObservatory(obs);
    } catch (err) {
      console.error("Error refreshing Frontier state:", err);
    } finally {
      setIsLoading(false);
    }
  }, [provider]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const setProviderMode = (mode: ProviderMode) => {
    setProviderModeState(mode);
  };

  // Simulation controls operate only on MockFrontierProvider
  const adjustVolume = (delta: number) => {
    if (provider instanceof MockFrontierProvider) {
      provider.adjustVolume(delta);
      refresh();
    }
  };

  const nextChapter = () => {
    if (provider instanceof MockFrontierProvider) {
      provider.nextChapter();
      refresh();
    }
  };

  const resetSimulation = () => {
    if (provider instanceof MockFrontierProvider) {
      provider.reset();
      refresh();
    }
  };

  const triggerHookRejection = () => {
    if (provider instanceof MockFrontierProvider) {
      provider.triggerHookRejection();
      refresh();
    }
  };

  const triggerRandomEvent = () => {
    if (provider instanceof MockFrontierProvider) {
      provider.triggerRandomEvent();
      refresh();
    }
  };

  const lookupWallet = async (address: string): Promise<WalletState> => {
    return provider.getWallet(address);
  };

  const isSimulationMode = providerMode === "simulation";

  return (
    <FrontierContext.Provider
      value={{
        provider,
        providerMode,
        setProviderMode,
        token,
        chapter,
        pool,
        events,
        hookEvents,
        observatory,
        isLoading,
        isSimulationMode,
        adjustVolume,
        nextChapter,
        resetSimulation,
        triggerHookRejection,
        triggerRandomEvent,
        lookupWallet,
        refresh,
      }}
    >
      {children}
    </FrontierContext.Provider>
  );
};

export const useFrontier = (): FrontierContextType => {
  const context = useContext(FrontierContext);
  if (!context) {
    throw new Error("useFrontier must be used within a FrontierProvider");
  }
  return context;
};
