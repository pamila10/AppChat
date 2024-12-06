import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { getUsers, users, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  return (
    <aside className="aside">
      <div className="status">
        <label className="status_label">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="checkbox"
          />
          <span>Show online only</span>
        </label>
        <span>({onlineUsers.length - 1} online)</span>
      </div>
      <div className="users">
        {filteredUsers.map((user) => (
          <button className="users_item"
            key={user._id}
            onClick={() => setSelectedUser(user)}
          >
            <img
              src={user.profilePic || "/avatar.png"}
              alt={user.name}
            />
            {onlineUsers.includes(user._id) && (
              <span
                className="absolute bottom-0 right-0"
              />
            )}
            <div className="users_data">
              <div className="text___bold">{user.fullName}</div>
              <div className="text_sm">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <div>No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;