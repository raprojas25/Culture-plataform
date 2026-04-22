import { create } from "zustand";
// import { Event, EventFilters } from '@/types/event.types';
//
// interface EventStore {
//   events: Event[];
//   currentEvent: Event | null;
//   filters: EventFilters;
//   isLoading: boolean;
//   pagination: {
//     page: number;
//     limit: number;
//     total: number;
//     pages: number;
//   };
//   setEvents: (events: Event[]) => void;
//   setCurrentEvent: (event: Event | null) => void;
//   setFilters: (filters: EventFilters) => void;
//   setLoading: (loading: boolean) => void;
//   setPagination: (pagination: EventStore['pagination']) => void;
//   addEvent: (event: Event) => void;
//   updateEvent: (id: number, event: Partial<Event>) => void;
//   removeEvent: (id: number) => void;
// }
//
export const useEventStore = create((set) => ({
  events: [],
  currentEvent: null,
  filters: {
    page: 1,
    limit: 12,
  },
  isLoading: false,
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    pages: 1,
  },
  setEvents: (events) => set({ events }),
  setCurrentEvent: (event) => set({ currentEvent: event }),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  setPagination: (pagination) => set({ pagination }),
  addEvent: (event) =>
    set((state) => ({
      events: [event, ...state.events],
    })),
  updateEvent: (id, updatedEvent) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id ? { ...event, ...updatedEvent } : event,
      ),
      currentEvent:
        state.currentEvent?.id === id
          ? { ...state.currentEvent, ...updatedEvent }
          : state.currentEvent,
    })),
  removeEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),
}));
