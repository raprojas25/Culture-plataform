import { Button } from "@/shared/components/ui/Button";
import { Save, Trash2, ExternalLink, Grid, PanelTop } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/shared/components/ui/Badge";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIcon,
  Edit2,
  GroupIcon,
  User,
  Facebook,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import React, { Children } from "react";
import { NewSelect } from "@/shared/components/ui/NewSelect";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table/index";
import { FormProvider, useForm } from "react-hook-form";
import { Paragraph } from "@/shared/components/ui/Paragraph";
import Tabs from "@/shared/components/ui/Tabs";
import Select from "@/shared/components/ui/Select";
import { Heading } from "@/shared/components/ui/Heading";
export const Extras = () => {
  const [isSaving, setIsSaving] = useState(false);

  const [selected, setSelected] = useState();
  const tabs = [
    { id: "basic", label: "Información básica" },
    { id: "details", label: "Detalles" },
    { id: "tickets", label: "Entradas" },
  ];
  const [activeTab, setActiveTab] = useState("basic");
  const [acepto, setAcepto] = useState(false);

  const methods = useForm();
  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSaving(false);
  };
  const [filters, setFilters] = useState({
    roles: "",
    search: "",
  });
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  const disabled = true;
  const error = true;
  const hint = true;

  const testData = [
    {
      id: 4,
      name: "Arte",
      icon: "🎨",
      color: "#96CEB4",
      created_at: "2026-03-14T10:25:32.321Z",
      description: "Exposiciones de arte y galerías",
      is_active: true,
      events_count: 0,
    },
    {
      id: 5,
      name: "Deporte",
      icon: "🎨",
      color: "#96CEB4",
      created_at: "2026-03-14T10:25:32.321Z",
      description: "Exposiciones de arte y galerías",
      is_active: true,
      events_count: 0,
    },
    {
      id: 6,
      name: "Ferias",
      icon: "🎨",
      color: "#96CEB4",
      created_at: "2026-03-14T10:25:32.321Z",
      description: "Exposiciones de arte y galerías",
      is_active: true,
      events_count: 0,
    },
  ];

  let textareaClasses = `w-full rounded-lg border px-4 py-2.5 text-sm shadow-xs focus:outline-hidden `;

  if (disabled) {
    textareaClasses += ` bg-gray-100 opacity-50 text-gray-900 border-gray-300 cursor-not-allowed opacity40 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700`;
  } else if (error) {
    textareaClasses += ` bg-transparent  border-gray-300 focus:border-red-300 focus:ring-3 focus:ring-red-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-error-800`;
  } else {
    textareaClasses += ` bg-transparent text-gray-900 dark:text-gray-300 text-gray-900 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
  }

  // Define the table data using the interface
  const tableData = [
    {
      id: 1,
      name: "MacBook Pro 13”",
      variants: "2 Variants",
      category: "Laptop",
      price: "$2399.00",
      status: "Delivered",
      image: "/images/product/product-01.jpg", // Replace with actual image URL
    },
    {
      id: 2,
      name: "Apple Watch Ultra",
      variants: "1 Variant",
      category: "Watch",
      price: "$879.00",
      status: "Pending",
      image: "/images/product/product-02.jpg", // Replace with actual image URL
    },
    {
      id: 3,
      name: "iPhone 15 Pro Max",
      variants: "2 Variants",
      category: "SmartPhone",
      price: "$1869.00",
      status: "Delivered",
      image: "/images/product/product-03.jpg", // Replace with actual image URL
    },
    {
      id: 4,
      name: "iPad Pro 3rd Gen",
      variants: "2 Variants",
      category: "Electronics",
      price: "$1699.00",
      status: "Canceled",
      image: "/images/product/product-04.jpg", // Replace with actual image URL
    },
    {
      id: 5,
      name: "AirPods Pro 2nd Gen",
      variants: "1 Variant",
      category: "Accessories",
      price: "$240.00",
      status: "Delivered",
      image: "/images/product/product-05.jpg", // Replace with actual image URL
    },
  ];
  return (
    <>
      <div className="relative">
        <textarea placeholder="search" className={textareaClasses} />
        {hint && (
          <p
            className={`mt-2 text-sm ${
              error ? "text-error-500" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {hint}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {/* <!-- Metric Item Start --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>

          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Customers
              </span>
              <h4 className="mt-2 font-extrabold text-gray-800 text-base dark:text-white/90">
                3,782
              </h4>
            </div>
            <Badge variant="success" size="sm" leftIcon={ArrowUpIcon}>
              11.01%
            </Badge>
          </div>
        </div>
        {/* <!-- Metric Item End --> */}

        {/* <!-- Metric Item Start --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <BoxIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Orders
              </span>
              <h4 className="mt-2 font-extrabold text-gray-800 text-base dark:text-white/90">
                5,359
              </h4>
            </div>

            <Badge variant="danger" size="sm" leftIcon={ArrowDownIcon}>
              9.05%
            </Badge>
          </div>
        </div>
        {/* <!-- Metric Item End --> */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="items-center w-full rounded-full max-w-8">
                <img src="" alt="usa" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm dark:text-white/90">
                  USA
                </p>
                <span className="block text-gray-500 text-xs dark:text-gray-400">
                  2,379 Customers
                </span>
              </div>
            </div>

            <div className="flex w-full max-w-[140px] items-center gap-3">
              <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                <div className="absolute left-0 top-0 flex h-full w-[79%] items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white bg-gradient-to-r to-purple-500 from-blue-400"></div>
              </div>
              <p className="font-medium text-gray-800 text-sm dark:text-white/90">
                79%
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="items-center w-full rounded-full max-w-8">
                <img src="" alt="france" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm dark:text-white/90">
                  France
                </p>
                <span className="block text-gray-500 text-xs dark:text-gray-400">
                  589 Customers
                </span>
              </div>
            </div>

            <div className="flex w-full max-w-[140px] items-center gap-3">
              <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800 bg-clip-content">
                <div className="absolute left-0 top-0 flex h-full w-[23%] items-center justify-center rounded-sm bg-brand-500 text-xs font-medium bg-gradient-to-r from-blue-400 to-purple-400"></div>
              </div>
              <p className="font-medium text-gray-800 text-sm dark:text-white/90">
                23%
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* card */}
      <div
        className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]`}
      >
        {/* Card Header */}
        <div className="px-6 py-5">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            title
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            description
          </p>
        </div>

        {/* Card Body */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
          <div className="space-y-6">body lorem insup</div>
        </div>
      </div>

      {/* user perfil */}
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <User className="w-full h-full" />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                Musharof Chowdhury
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Team Manager
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Arizona, United States
                </p>
              </div>
            </div>
            <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
              <a
                href="https://www.facebook.com/PimjoHQ"
                target="_blank"
                rel="noopener"
                className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
              >
                <Facebook />
              </a>

              <a
                href="https://x.com/PimjoHQ"
                target="_blank"
                rel="noopener"
                className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
              >
                <X />
              </a>
            </div>
          </div>
          <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
            <Edit2 size={15} />
            Edit
          </button>
        </div>
      </div>
      {/* biographia */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
          Personal Information
        </h4>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              First Name
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Musharof
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Last Name
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Chowdhury
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Email address
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              randomuser@pimjo.com
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Phone
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              +09 363 398 46
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Bio
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Team Manager
            </p>
          </div>
        </div>
      </div>

      {/* coment tables */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Recent Orders
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
              <svg
                className="stroke-current fill-white dark:fill-gray-800"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.29004 5.90393H17.7067"
                  stroke=""
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.7075 14.0961H2.29085"
                  stroke=""
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                  fill=""
                  stroke=""
                  strokeWidth="1.5"
                />
                <path
                  d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                  fill=""
                  stroke=""
                  strokeWidth="1.5"
                />
              </svg>
              Filter
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
              See all
            </button>
          </div>
        </div>
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400"
                >
                  Products
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400"
                >
                  Category
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400"
                >
                  Price
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {tableData.map((product) => (
                <TableRow key={product.id} className="">
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                        <img
                          src={product.image}
                          className="h-[50px] w-[50px]"
                          alt={product.name}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm dark:text-white/90">
                          {product.name}
                        </p>
                        <span className="text-gray-500 text-xs dark:text-gray-400">
                          {product.variants}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-2 text-gray-500 text-sm dark:text-gray-400">
                    {product.price}
                  </TableCell>
                  <TableCell className="py-3 px-2 text-gray-500 text-sm dark:text-gray-400">
                    {product.category}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      variant={
                        product.status === "Delivered"
                          ? "success"
                          : product.status === "Pending"
                            ? "warning"
                            : "danger"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="space-x-5 space-y-5 p-6">
        {/* Primario con icono izquierdo y estado de carga */}
        <Button
          variant="primary"
          leftIcon={Save}
          onClick={handleSave}
          isLoading={isSaving}
        >
          Guardar cambios
        </Button>

        {/* Peligro con icono derecho */}
        <Button variant="danger" rightIcon={Trash2}>
          Eliminar
        </Button>

        {/* Peligro con icono derecho */}
        <Button variant="warning" rightIcon={Trash2}>
          Eliminar
        </Button>

        {/* Outline deshabilitado */}
        <Button variant="outline" disabled>
          Opción no disponible
        </Button>

        {/* Ghost tamaño pequeño */}
        <Button variant="ghost" size="sm">
          gost
        </Button>

        {/* Link */}
        <Button variant="link" rightIcon={ExternalLink}>
          Ver documentación
        </Button>

        {/* Éxito tamaño grande */}
        <Button variant="success" size="lg">
          Completado
        </Button>

        {/* Sin animaciones (accesibilidad) */}
        <Button variant="secondary" withAnimation={false}>
          Sin efectos hover/click
        </Button>
      </div>

      <div className="space-y-5 space-x-5 p-6">
        <Badge variant="success">Publicado</Badge>

        <Badge variant="warning" leftIcon={AlertTriangle}>
          Pendiente
        </Badge>

        <Badge variant="info" rightIcon={Info} size="sm">
          Novedad
        </Badge>

        <Badge variant="primary" leftIcon={CheckCircle} rightIcon={X}>
          Completado
        </Badge>

        <Badge size="sm" variant="outline">
          Experimental
        </Badge>

        <Badge
          size="lg"
          variant="outline"
          leftIcon={AlertTriangle}
          rightIcon={Info}
        >
          Experimental
        </Badge>

        <Badge
          as="div"
          variant="muted"
          className="w-full text-center justify-center"
          size="lg"
        >
          Badge de ancho completo
        </Badge>

        <Badge
          leftIcon={X}
          variant="danger"
          ariaLabel="Error: conexión perdida"
        >
          Error
        </Badge>
        {/* Con custom className */}
        <Badge
          variant="purple"
          className="shadow-sm ring-1 ring-violet-200 dark:ring-violet-800"
        >
          Premium
        </Badge>
        {/* Solo icono (útil para indicadores) */}
        <Badge variant="info" leftIcon={Info} />

        <div className="py-16">
          <NewSelect
            options={testData}
            value={filters.roles}
            searchable={true}
            /*  onChange={(val, obj) => {
    console.log(val); // 4
    console.log(obj); // objeto completo
  }}
            */
            onChange={(value, obj) =>
              setFilters((prev) => ({ ...prev, roles: value }))
            }
            getOptionLabel={(opt) => `${opt.name} ${opt.icon}`}
            getOptionValue={(opt) => opt.id}
          />
        </div>
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
            <Grid size={18} />
          </div>
          <div className=" bg-gray-900 text-white p-2 rounded-sm ">
            <Grid size={18} />
          </div>
          <div className=" bg-gray-900 text-white p-2 rounded-sm ">
            <Grid size={18} />
          </div>
          <div className=" bg-gray-900 text-white p-2 rounded-sm ">
            <Grid size={18} />
          </div>
          <div className=" bg-gray-900 text-white p-2 rounded-sm ">
            <Grid size={18} />
          </div>
          <div className=" bg-gray-900 text-white p-2 rounded-sm ">
            <Grid size={18} />
          </div>
        </div>

        {/* sekect copia  */}
      </div>
    </>
  );
};
