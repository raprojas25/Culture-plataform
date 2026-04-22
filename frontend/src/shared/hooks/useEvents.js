import { useEffect } from "react";

import { useEventStore } from "../stores/eventStore";
import { eventService } from "../services/eventService";
import toast from "react-hot-toast";

export const useEvents = () => {
  const {
    events,
    filters,
    isLoading,
    pagination,
    setEvents,
    setLoading,
    setFilters,
    setPagination,
    addEvent,
    updateEvent,
    removeEvent,
  } = useEventStore();

  const fetchEvents = async (customFilters) => {
    try {
      setLoading(true);
      const combinedFilters = { ...filters, ...customFilters };
      const response = await eventService.getEvents(combinedFilters);
      setEvents(response.data.events);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error(error.response?.data?.error || "Error cargando eventos");
    } finally {
      setLoading(false);
    }
  };

  const fetchEventById = async (id) => {
    try {
      setLoading(true);
      const event = await eventService.getEventById(id);
      return event;
    } catch (error) {
      toast.error(error.response?.data?.error || "Error cargando evento");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createNewEvent = async (eventData) => {
    try {
      setLoading(true);
      const event = await eventService.createEvent(eventData);
      addEvent(event);
      toast.success("Evento creado exitosamente");
      return event;
    } catch (error) {
      toast.error(error.response?.data?.error || "Error creando evento");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateExistingEvent = async (id, eventData) => {
    try {
      setLoading(true);
      const event = await eventService.updateEvent(id, eventData);
      updateEvent(id, event);
      toast.success("Evento actualizado exitosamente");
      return event;
    } catch (error) {
      toast.error(error.response?.data?.error || "Error actualizando evento");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteExistingEvent = async (id) => {
    try {
      setLoading(true);
      await eventService.deleteEvent(id);
      removeEvent(id);
      toast.success("Evento eliminado exitosamente");
    } catch (error) {
      toast.error(error.response?.data?.error || "Error eliminando evento");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLikeEvent = async (id) => {
    try {
      await eventService.likeEvent(id);
      // Update local state
      updateEvent(id, {
        likes_count: (events.find((e) => e.id === id)?.likes_count || 0) + 1,
      });
      toast.success("Evento guardado en favoritos");
    } catch (error) {
      toast.error(error.response?.data?.error || "Error al dar like");
    }
  };

  const handleUnlikeEvent = async (id) => {
    try {
      await eventService.unlikeEvent(id);
      // Update local state
      updateEvent(id, {
        likes_count: Math.max(
          0,
          (events.find((e) => e.id === id)?.likes_count || 1) - 1,
        ),
      });
      toast.success("Like removido");
    } catch (error) {
      toast.error(error.response?.data?.error || "Error al remover like");
    }
  };

  // useEffect(() => {
  //   fetchEvents();
  // }, [filters.page, filters.limit]);
  //
  return {
    events,
    filters,
    isLoading,
    pagination,
    setFilters,
    fetchEvents,
    fetchEventById,
    createNewEvent,
    updateExistingEvent,
    deleteExistingEvent,
    handleLikeEvent,
    handleUnlikeEvent,
  };
};
