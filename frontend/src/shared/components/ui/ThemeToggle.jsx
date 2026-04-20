import React from "react";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/shared/stores/themeStore";

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleTheme}
      // className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-yellow-500"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun size={20} className="text-gray-100" />
      ) : (
        <Moon size={20} className="text-gray-700" />
      )}
    </button>
  );
};
