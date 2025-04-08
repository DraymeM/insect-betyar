// src/hooks/useSystemTheme.ts
import { useEffect } from "react";

export const useSystemTheme = () => {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");

    const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      const prefersLight = e.matches;
      if (prefersLight) {
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
      } else {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
      }
    };

    // Set initial theme
    updateTheme(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener("change", updateTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, []);
};
