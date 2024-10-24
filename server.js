const http = require("http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

let users = [];
let lockedTasks = [];

app.prepare().then(() => {
    const server = http.createServer((req, res) => {
        handle(req, res);
    });

    const io = new Server(server);

    io.on("connection", (socket) => {
        socket.on("newUser", ({ name, color }) => {
            if (!users.find((user) => user.name === name)) {
                users.push({ id: socket.id, name, color });
                io.emit("updateUsers", users);
            }
        });

        socket.on("updateBoard", (data) => {
            io.emit("updateBoard", data);
        });

        socket.on("lockTask", (task) => {
            lockedTasks.push({ id: task.id, userId: socket.id, name: task.name, color: task.color });
            io.emit("updateLockedTasks", lockedTasks);
        });

        socket.on("unlockTask", (id) => {
            lockedTasks = lockedTasks.filter((task) => task.id !== id);
            io.emit("updateLockedTasks", lockedTasks);
        });

        socket.on("disconnect", () => {
            users = users.filter((user) => user.id !== socket.id);

            Object.keys(lockedTasks).forEach((taskId) => {
                if (lockedTasks[taskId].userId === socket.id) {
                    delete lockedTasks[taskId];
                    io.emit("unlockTask", taskId);
                }
            });
            io.emit("updateUsers", users);
        });
    });

    server.listen(3000, () => {
        console.log("Server running on http://localhost:3000");
    });
});
