import { create } from "zustand";

const useUsersStore = create((set) => ({
    connectedUsers: [],
    setConnectedUsers: (connectedUsers) => set({ connectedUsers }),
    lockedTasks: [],
    setLockedTasks: (lockedTasks) => set({ lockedTasks }),
}));

export default useUsersStore;
