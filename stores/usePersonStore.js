import { create } from "zustand";

const usePersonStore = create((set) => ({
    name: "",
    setName: (name) => set({ name }),
    color: "bg-blue-600",
    setColor: (color) => set({ color }),
    showNameModal: true,
    setShowNameModal: (showNameModal) => set({ showNameModal }),
}));

export default usePersonStore;
