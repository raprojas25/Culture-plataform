import React, { useEffect, useState } from "react";
import { Calendar, Grid, List } from "lucide-react";
import { useEvents } from "../../hooks/useEvents";
import { EventFilters } from "../../components/features/EventFilters";
import { EventCard } from "../../components/features/EventCard";
import { Button } from "../../components/ui/Button";
import { categoryService } from "../../services/categoryService";
// import { Category } from '../../services/category.service';

export const EventsList = () => {
  const { events, filters, pagination, setFilters, fetchEvents, isLoading } =
    useEvents();
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    fetchCategories();
    fetchDistricts();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchDistricts = async () => {
    // Mock districts - implement API call when available
    setDistricts([
      { id: 1, name: "Miraflores", city: "Lima" },
      { id: 2, name: "Barranco", city: "Lima" },
      { id: 3, name: "San Isidro", city: "Lima" },
      { id: 4, name: "Cercado", city: "Lima" },
    ]);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...newFilters, page: 1 });
  };

  const handlePageChange = (page) => {
    setFilters({ page });
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-8 py-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Descubre Eventos Culturales
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Encuentra los mejores eventos, conciertos, talleres y más en tu
            ciudad
          </p>
        </div>
      </div>

      {/* Filters */}
      <EventFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        categories={categories}
        districts={districts}
      />

      {/* View Controls */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600 dark:text-gray-400">
            Mostrando <span className="font-semibold">{events.length}</span> de{" "}
            <span className="font-semibold">{pagination.total}</span> eventos
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "primary" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "primary" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Events Grid/List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 text-gray-400 mb-4">
            <Calendar className="w-full h-full" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No se encontraron eventos
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Intenta cambiar los filtros de búsqueda
          </p>
        </div>
      ) : (
        <>
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onLike={() => console.log("Like:", event.id)}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg ${
                        page === pagination.page
                          ? "bg-primary-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};
