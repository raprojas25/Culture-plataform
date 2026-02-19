import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

const NotFount = () => {
  return (
    <div className="flex flex-col items-center justify-center text-sm max-md:px-4 min-h-screen dark:bg-gray-800">
      <div className="bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text dark:bg-gradient-to-r dark:from-gray-500 dark:to-gray-400 transition-colors duration-200">
        <h1 className="text-8xl md:text-9xl font-bold text-transparent">404</h1>
      </div>
      <div className="h-1 w-16 rounded bg-gradient-to-r from-red-500 to-orange-500 my-5 md:my-7"></div>
      <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-400">
        Pagina no encontrada
      </p>
      <p className="text-sm md:text-base mt-4 text-gray-500 max-w-md text-center dark:text-gray-400">
        La página que está buscando podría haber sido eliminada, su nombre
        cambió o no está disponible temporalmente.
      </p>
      <div className="flex items-center gap-4 mt-6">
        <Link to="/">
          <Button variant="secondary" size="md">
            Volver a inicio
          </Button>
        </Link>

        <Link to="/Contacto">
          <Button variant="outline" size="md">
            Contactar Soporte
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFount;
