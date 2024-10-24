import useBoardStore from "@/stores/useBoardStore";
import useUsersStore from "@/stores/useUsersStore";
import usePersonStore from "@/stores/usePersonStore";
import useBoard from "@/hooks/useBoard";
import classNames from "classnames";

const columnsData = [
    {
        name: "todo",
        title: "To Do",
    },
    {
        name: "inprogress",
        title: "In Progress",
    },
    {
        name: "done",
        title: "Done",
    },
];

export default function Board() {
    const { columns, editingTask, editContent, setEditContent } = useBoardStore();
    const { onDragStart, onDrop, handleEditTask, saveEdit, addTask } = useBoard();
    const { lockedTasks } = useUsersStore();
    const { name, color } = usePersonStore();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
            {columnsData.map((column) => (
                <div
                    key={column.name}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => onDrop(e, column.name)}
                    className="flex flex-col p-4 bg-white shadow-lg rounded-lg min-h-[400px]"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 capitalize text-center">{column.title}</h2>
                    <div className="flex-1 space-y-4 overflow-y-auto">
                        {columns[column.name].map((task) => {
                            const lockedTask = lockedTasks.find((t) => t?.id === task.id && t?.name !== name);
                            const isLocked = lockedTask ? true : false;
                            console.log(lockedTask?.color.split("-"));

                            return (
                                <div
                                    key={task.id}
                                    title="Drag me"
                                    draggable={!isLocked}
                                    onDragStart={(e) => !isLocked && onDragStart(e, task, column.name)}
                                    className={classNames(
                                        "flex justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-2",
                                        {
                                            [`border-${lockedTask?.color.split("-")[1]}-500`]: lockedTask,
                                            "border-red-500": !lockedTask,
                                        }
                                    )}
                                >
                                    {editingTask === task.id ? (
                                        <input
                                            className="flex-1 p-2 border rounded"
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                        />
                                    ) : (
                                        <span className="flex-1">{task.content}</span>
                                    )}

                                    {editingTask === task.id ? (
                                        <button className="ml-2 text-green-500" onClick={() => saveEdit(column.name)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                                                <path
                                                    fill="currentColor"
                                                    d="M21 7v12q0 .825-.587 1.413T19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h12zm-9 11q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-6-8h9V6H6z"
                                                ></path>
                                            </svg>
                                        </button>
                                    ) : (
                                        !isLocked && (
                                            <button
                                                className="ml-2 text-blue-500"
                                                onClick={() => handleEditTask(task.id, name, color, task.content)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                                                    <path
                                                        fill="currentColor"
                                                        d="M20.71 7.04c-.34.34-.67.67-.68 1c-.03.32.31.65.63.96c.48.5.95.95.93 1.44s-.53 1-1.04 1.5l-4.13 4.14L15 14.66l4.25-4.24l-.96-.96l-1.42 1.41l-3.75-3.75l3.84-3.83c.39-.39 1.04-.39 1.41 0l2.34 2.34c.39.37.39 1.02 0 1.41M3 17.25l9.56-9.57l3.75 3.75L6.75 21H3z"
                                                    ></path>
                                                </svg>
                                            </button>
                                        )
                                    )}
                                    {isLocked ? <div className="mt-1 text-xs text-red-500">Editing by {lockedTask?.name}</div> : null}
                                </div>
                            );
                        })}
                    </div>

                    <button
                        className="flex justify-center backdrop:mt-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        onClick={() => addTask(column.name)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                            <path fill="white" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"></path>
                        </svg>
                        Add Task
                    </button>
                </div>
            ))}
        </div>
    );
}
