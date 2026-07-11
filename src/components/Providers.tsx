"use client";

import { StoreProvider, useStore } from "../lib/store";
import { useEffect, type ReactNode } from "react";

function SpeciesThemeSync({ children }: { children: ReactNode }) {
  const { state } = useStore();
  useEffect(() => {
    document.documentElement.setAttribute("data-species", state.speciesMode);
  }, [state.speciesMode]);
  return <>{children}</>;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <SpeciesThemeSync>{children}</SpeciesThemeSync>
    </StoreProvider>
  );
}
