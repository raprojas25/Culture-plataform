import React, { useState, useEffect } from "react";

const GradientBackground = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detectar preferencia del sistema para modo oscuro
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div
      className={`min-h-screen w-full transition-all duration-500 ${isDarkMode ? "dark" : ""}`}
    >
      {/* Fondo principal con degradados */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Degradado principal */}
        <div
          className={`absolute inset-0 transition-all duration-700 ${
            isDarkMode
              ? "bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-800"
              : "bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white"
          }`}
        ></div>

        {/* Degradado de acento */}
        <div
          className={`absolute top-0 right-0 w-1/3 h-1/3 blur-3xl transition-all duration-1000 ${
            isDarkMode
              ? "bg-gradient-to-tr from-purple-600/20 to-transparent"
              : "bg-gradient-to-tr from-blue-400/20 to-transparent"
          }`}
        ></div>

        {/* Segundo degradado de acento */}
        <div
          className={`absolute bottom-0 left-0 w-1/2 h-1/2 blur-3xl transition-all duration-1000 ${
            isDarkMode
              ? "bg-gradient-to-tr from-cyan-500/15 to-transparent"
              : "bg-gradient-to-tr from-indigo-300/20 to-transparent"
          }`}
        ></div>

        {/* Patrón de puntos sutiles */}
        <div
          className={`absolute inset-0 opacity-30 ${
            isDarkMode ? "opacity-10" : "opacity-30"
          }`}
          style={{
            backgroundImage: `radial-gradient(${
              isDarkMode ? "#ffffff" : "#3b82f6"
            } 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Efectos de partículas/brillo */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64">
          <div
            className={`absolute inset-0 rounded-full blur-xl transition-all duration-1000 ${
              isDarkMode
                ? "bg-gradient-to-r from-purple-500/10 to-cyan-500/10"
                : "bg-gradient-to-r from-blue-300/20 to-cyan-300/20"
            }`}
          ></div>
        </div>

        {/* Líneas de gradiente sutiles */}
        <div
          className={`absolute top-0 left-0 w-full h-1 transition-all duration-1000 ${
            isDarkMode
              ? "bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
              : "bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
          }`}
        ></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">{children}</div>

      {/* Botón para alternar modo oscuro/claro (opcional) */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg z-20 transition-all duration-300 ${
          isDarkMode
            ? "bg-gray-800 text-white hover:bg-gray-700"
            : "bg-white text-gray-800 hover:bg-gray-100"
        }`}
        aria-label={
          isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
        }
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>
    </div>
  );
};

export default GradientBackground;
