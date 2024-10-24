import React from "react";
import usePersonStore from "@/stores/usePersonStore";
import useSocket from "@/hooks/useSocket";

export default function NewUserModal() {
    const { name, setName, color, setColor, setShowNameModal } = usePersonStore();
    const { emitNewUser } = useSocket();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Enter your name</h2>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                    placeholder="Your name"
                />
                <div className="flex space-x-2 mb-4">
                    <div
                        className={`w-8 h-8 rounded-full cursor-pointer bg-blue-600 ${color === "bg-blue-600" ? "ring-2 ring-black" : ""}`}
                        onClick={() => setColor("bg-blue-600")}
                    ></div>
                    <div
                        className={`w-8 h-8 rounded-full cursor-pointer bg-red-600 ${color === "bg-red-600" ? "ring-2 ring-black" : ""}`}
                        onClick={() => setColor("bg-red-600")}
                    ></div>
                    <div
                        className={`w-8 h-8 rounded-full cursor-pointer bg-green-600 ${
                            color === "bg-green-600" ? "ring-2 ring-black" : ""
                        }`}
                        onClick={() => setColor("bg-green-600")}
                    ></div>
                    <div
                        className={`w-8 h-8 rounded-full cursor-pointer bg-yellow-600 ${
                            color === "bg-yellow-600" ? "ring-2 ring-black" : ""
                        }`}
                        onClick={() => setColor("bg-yellow-600")}
                    ></div>
                </div>

                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={() => {
                        setName(name);
                        setShowNameModal(false);
                        emitNewUser(name, color);
                    }}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
