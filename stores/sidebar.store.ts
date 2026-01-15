import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

// Detect default based on window width
const getDefaultOpen = () =>
  typeof window !== "undefined" ? window.innerWidth >= 768 : true;

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: getDefaultOpen(),
  setOpen: (open) => set({ isOpen: open }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
