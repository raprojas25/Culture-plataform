import { Button } from "@/shared/components/ui/Button";
import { Paragraph } from "@/shared/components/ui/Paragraph";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFount = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-sm max-md:px-4 min-h-screen dark:bg-dark-800">
      <div className="bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text dark:bg-gradient-to-r dark:from-gray-500 dark:to-gray-400 transition-colors duration-200">
        <h1 className="text-8xl md:text-9xl font-bold text-transparent">404</h1>
      </div>
      <div className="h-1 w-16 rounded bg-gradient-to-r from-red-500 to-orange-500 my-5 md:my-7"></div>
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-400 mb-8">
        Pagina no encontrada
      </h3>
      <Paragraph size="base" color="muted" className="text-center">
        La página que está buscando podría haber sido eliminada, su nombre
        cambió o no está disponible temporalmente.
      </Paragraph>
      <div className="flex justify-center items-center gap-8 mt-6">
        <Button
          variant="secondary"
          size="md"
          onClick={() => navigate(-1)}
          leftIcon={ArrowLeft}
        >
          Volver
        </Button>

        <Button 
            variant="outline"
            size="md"
            onClick={()=>navigate("/contacto")}
          >
            Contactar Soporte
          </Button>
      </div>
      
    </div>
  );
};

export default NotFount;
