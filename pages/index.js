import UserAvatar from "@/components/UserAvatar";
import useUsersStore from "@/stores/useUsersStore";
import usePersonStore from "@/stores/usePersonStore";
import NewUserModal from "@/components/NewUserModal";
import Board from "@/components/Board";

export default function Home() {
    const { connectedUsers } = useUsersStore();
    const { name, color, showNameModal } = usePersonStore();

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-50 p-8">
            <div className="flex justify-end mb-6">
                <div className="space-x-2">
                    {connectedUsers
                        .filter((user) => user.name !== name)
                        .map((user, index) => (
                            <UserAvatar key={index} name={user.name} color={user.color} />
                        ))}
                </div>
                <div className="ml-2">{name && <UserAvatar name={name} color={color} isCurrentUser />}</div>
            </div>
            <Board />
            {showNameModal && <NewUserModal />}
        </div>
    );
}
