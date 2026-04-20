// External
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Internal
import { Rutas } from "./Routes";
import { useThemeStore } from "@/shared/stores/themeStore";

function App() {
  const { isDarkMode } = useThemeStore();
  return (
    <>
      <Router>
        <Rutas />
      </Router>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDarkMode ? "#1f2937" : "#fff",
            color: isDarkMode ? "#fff" : "#374151",
            border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
          },
        }}
      />
    </>
  );
}

export default App;
