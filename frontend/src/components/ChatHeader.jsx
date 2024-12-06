import { FaWindowClose } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="chatInfo">
      <div className="chatInfo_user">
        <img className="chatInfo_userImg" src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
        <div className="chatInfo_userText">
          <p className="text text___bold">{selectedUser.fullName}</p>
          <p>
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <button className="chatInfo_close" onClick={() => setSelectedUser(null)}><FaWindowClose /></button>
    </div>
  );
};

export default ChatHeader;