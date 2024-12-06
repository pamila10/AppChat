import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
    
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="chatWrap">
        <ChatHeader />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="chatWrap">
      <ChatHeader />
      <div className="chat">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`msg ${message.senderId === authUser._id ? "msg___end" : "msg___start"}`}
            ref={messageEndRef}
          >
            <div>
              <img
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePic || "/avatar.png"
                    : selectedUser.profilePic || "/avatar.png"
                }
                className="chat_img"
                alt="profile pic"
              />
            </div>
            <div className="msg_text">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                />
              )}
              {message.text && <p>{message.text}</p>}
              <time>
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
          </div>
        ))}
      </div>
      <MessageInput/>
    </div>
  );
};

export default ChatContainer;