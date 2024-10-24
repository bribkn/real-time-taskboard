import React from "react";

export default function UserAvatar({ name, color, isCurrentUser = false }) {
    return (
        <div className="flex items-center space-x-2">
            <div className={`w-10 h-10 ${color} text-white rounded-full flex items-center justify-center`}>{name[0]}</div>
            {isCurrentUser ? <span className="text-gray-700 font-medium">{name}</span> : null}
        </div>
    );
}
