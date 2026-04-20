import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/Button";
import Select from "@/shared/components/ui/Select";
import { useState } from "react";
import { Paragraph } from "@/shared/components/ui/Paragraph";
import Tabs from "@/shared/components/ui/Tabs";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Heading } from "@/shared/components/ui/Heading";
import { ArrowLeft, Grid, PanelTop } from "lucide-react";
import "./css.css";
const NotFount = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState();
  const tabs = [
    { id: "basic", label: "Información básica" },
    { id: "details", label: "Detalles" },
    { id: "tickets", label: "Entradas" },
  ];
  const [activeTab, setActiveTab] = useState("basic");
  const [acepto, setAcepto] = useState(false);

  const methods = useForm();
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
        {/* <Link to="/"> */}
        {/*   <Button variant="secondary" size="md"> */}
        {/*     Volver a inicio */}
        {/*   </Button> */}
        {/* </Link> */}
        {/**/}
        <Link to="/Contacto">
          <Button variant="outline" size="md">
            Contactar Soporte
          </Button>
        </Link>
      </div>
      <Select
        options={[
          { value: "1", label: "Opción 1" },
          { value: "2", label: "Opción 2" },
          { value: "3", label: "Opción 3" },
          { value: "4", label: "uno" },
          { value: "5", label: "dos" },
          { value: "6", label: "seis" },
        ]}
        value={selected}
        onChange={setSelected}
        placeholder="Elige una opción"
        searchable
        searchPlaceholder="Filtrar..."
        disabled={false}
      />
      <Paragraph size="sm" color="muted" margin>
        Este es un párrafo grande con color suave y margen inferior.
      </Paragraph>

      <div className="mt-8 border border-slate-400 rounded-md p-4">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <FormProvider {...methods}>
          <form className="space-y-6">
            {activeTab === "basic" && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* tus campos */}
                <Paragraph size="sm">texto inicio</Paragraph>
              </div>
            )}

            {activeTab === "details" && <div>contenido de detalles</div>}

            {activeTab === "tickets" && <div>contenido de entradas</div>}
          </form>
        </FormProvider>
      </div>
      <Heading level="h1" size="4xl" align="center">
        Título principal centrado
      </Heading>

      <Heading level="h3" color="muted">
        Subtítulo con color secundario
      </Heading>

      <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 border border-gray-900/5 shadow-xl  dark:ring-gray-200/5 mb-10">
        <div>
          <span className="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">
            <PanelTop className="h-6 w-6 stroke-white" />
          </span>
        </div>
        <h3 className="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">
          Writes upside-down
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
          The Zero Gravity Pen can be used to write in any orientation,
          including upside-down. It even works in outer space.
        </p>
      </div>

      {/* ejemplos */}
      <div className="container flex items-center justify-center text-sm max-md:px-4 bg-gray-600 py-0.5">
        <div className="flex justify-around items-center py-2 gap-4 w-full">
          <div className=" bg-gray-900 text-indigo-500 p-2 rounded-sm ">
            <Grid size={18}/>
          </div>
          <div className=" bg-gray-900 text-white p-2 rounded-sm ">
            <Grid size={18}/>
          </div>
          <div className=" bg-gray-900 text-white p-2 rounded-sm ">
            <Grid size={18}/>
          </div>
          <div className=" bg-gray-900 text-white p-2 rounded-sm ">
            <Grid size={18}/>
          </div>
          <div className=" bg-gray-900 text-white p-2 rounded-sm ">
            <Grid size={18}/>
          </div>
          <div className=" bg-gray-900 text-white p-2 rounded-sm ">
            <Grid size={18}/>
          </div>
        </div>


        {/* sekect copia  */}

      </div>
    </div>
  );
};

export default NotFount;
