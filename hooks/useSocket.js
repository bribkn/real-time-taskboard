import useBoardStore from "@/stores/useBoardStore";
import useUsersStore from "@/stores/useUsersStore";
import { useEffect } from "react";
import io from "socket.io-client";

let socket;

export default function useSocket() {
    const { setColumns } = useBoardStore();
    const { setConnectedUsers, setLockedTasks, lockedTasks } = useUsersStore();

    useEffect(() => {
        if (!socket) {
            socket = io();
        }

        socket.on("connect", () => {
            console.log("Connected to Socket.io server: ", socket.id);
        });

        socket.on("updateBoard", (data) => {
            setColumns(data);
        });

        socket.on("updateUsers", (users) => {
            setConnectedUsers(users);
        });

        socket.on("updateLockedTasks", (tasks) => {
            setLockedTasks(tasks);
        });
        socket.on("disconnect", () => {
            console.log("Socket.io disconnected");
        });
    }, [setColumns, setConnectedUsers, setLockedTasks]);

    const emitUpdateBoard = (updatedColumns) => {
        socket.emit("updateBoard", updatedColumns);
    };

    const emitLockTask = (id, name, color) => {
        socket.emit("lockTask", { id, name, color });
    };

    const emitUnlockTask = (id) => {
        socket.emit("unlockTask", id);
    };

    const emitNewUser = (name, color) => {
        if (socket && socket.connected) socket.emit("newUser", { name, color });
        else console.log("Socket not connected");
    };

    return {
        emitUpdateBoard,
        emitLockTask,
        emitUnlockTask,
        emitNewUser,
    };
}
