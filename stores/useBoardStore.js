import { create } from "zustand";

const useBoardStore = create((set) => ({
    columns: {
        todo: [{ id: "1", content: "Task 1" }],
        inprogress: [{ id: "2", content: "Task 2" }],
        done: [{ id: "3", content: "Task 3" }],
    },
    setColumns: (columns) => set({ columns }),
    editContent: "",
    setEditContent: (editContent) => set({ editContent }),
    editingTask: null,
    setEditingTask: (editingTask) => set({ editingTask }),
}));

export default useBoardStore;
