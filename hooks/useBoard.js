import useBoardStore from "@/stores/useBoardStore";
import useUsersStore from "@/stores/useUsersStore";
import useSocket from "@/hooks/useSocket";

export default function useBoard() {
    const { columns, setColumns, editingTask, setEditingTask, editContent, setEditContent } = useBoardStore();
    const { setLockedTasks } = useUsersStore();
    const { emitUpdateBoard, emitLockTask, emitUnlockTask } = useSocket({
        setColumns,
        setLockedTasks,
    });

    const onDragStart = (e, item, source) => {
        e.dataTransfer.setData("item", JSON.stringify(item));
        e.dataTransfer.setData("source", source);
    };

    const onDrop = (e, destination) => {
        const item = JSON.parse(e.dataTransfer.getData("item"));
        const source = e.dataTransfer.getData("source");

        if (source !== destination) {
            const newSourceItems = columns[source].filter((i) => i.id !== item.id);
            const newDestinationItems = [...columns[destination], item];
            const updatedColumns = {
                ...columns,
                [source]: newSourceItems,
                [destination]: newDestinationItems,
            };
            setColumns(updatedColumns);
            emitUpdateBoard(updatedColumns);
        }
    };

    const handleEditTask = (id, name, color, content) => {
        setEditingTask(id);
        setEditContent(content);
        emitLockTask(id, name, color);
    };

    const saveEdit = (column) => {
        const updatedColumns = {
            ...columns,
            [column]: columns[column].map((task) => (task.id === editingTask ? { ...task, content: editContent } : task)),
        };
        setColumns(updatedColumns);
        setEditingTask(null);
        setEditContent("");
        emitUpdateBoard(updatedColumns);
        emitUnlockTask(editingTask);
    };

    const addTask = (column) => {
        const newTask = {
            id: Date.now().toString(),
            content: `New Task ${columns[column].length + 1}`,
        };

        const updatedColumns = {
            ...columns,
            [column]: [...columns[column], newTask],
        };

        setColumns(updatedColumns);
        emitUpdateBoard(updatedColumns);
    };

    return {
        onDragStart,
        onDrop,
        handleEditTask,
        saveEdit,
        addTask,
    };
}
