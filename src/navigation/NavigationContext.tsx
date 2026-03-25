import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Route, RouteEntry, NavigationState } from './types';

interface NavigationContextValue extends NavigationState {
  direction: 'push' | 'pop';
  /** The previous route, kept during transition so we can render both screens */
  prevRoute: RouteEntry | null;
  clearPrevRoute: () => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

let keyCounter = 0;
function nextKey(): string {
  return `route-${++keyCounter}`;
}

function createEntry(route: Route, params?: Record<string, unknown>): RouteEntry {
  return { route, params, key: nextKey(), selectedIndex: 0 };
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [stack, setStack] = useState<RouteEntry[]>([
    createEntry('MainMenu'),
  ]);
  const [direction, setDirection] = useState<'push' | 'pop'>('push');
  const [prevRoute, setPrevRoute] = useState<RouteEntry | null>(null);

  const push = useCallback((route: Route, params?: Record<string, unknown>) => {
    setDirection('push');
    setStack((prev) => {
      // Save current top as prevRoute for transition
      setPrevRoute(prev[prev.length - 1]);
      return [...prev, createEntry(route, params)];
    });
  }, []);

  const pop = useCallback(() => {
    setStack((prev) => {
      if (prev.length <= 1) return prev;
      setDirection('pop');
      // Save the screen being popped as prevRoute
      setPrevRoute(prev[prev.length - 1]);
      return prev.slice(0, -1);
    });
  }, []);

  const popToRoot = useCallback(() => {
    setStack((prev) => {
      if (prev.length <= 1) return prev;
      setDirection('pop');
      setPrevRoute(prev[prev.length - 1]);
      return [prev[0]];
    });
  }, []);

  const setSelectedIndex = useCallback((index: number) => {
    setStack((prev) => {
      const updated = [...prev];
      const last = updated[updated.length - 1];
      updated[updated.length - 1] = { ...last, selectedIndex: index };
      return updated;
    });
  }, []);

  const clearPrevRoute = useCallback(() => {
    setPrevRoute(null);
  }, []);

  const currentRoute = stack[stack.length - 1];

  return (
    <NavigationContext.Provider
      value={{ stack, currentRoute, push, pop, popToRoot, setSelectedIndex, direction, prevRoute, clearPrevRoute }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return ctx;
}
