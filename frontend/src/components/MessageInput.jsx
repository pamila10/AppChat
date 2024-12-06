import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";

const JSONPLACEHOLDER_API = `https://jsonplaceholder.typicode.com/comments/`;

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, sendQuote, selectedUser } = useChatStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      handleJsonplaceholderAnswer();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleJsonplaceholderAnswer = async () => {
    let num = (min, max) => {
      let getNum = Math.floor(Math.random() * (max - min + 1)) + min;
      return getNum
    }
    try {
      const response = await fetch(JSONPLACEHOLDER_API + `/${num(1, 100)}`);
      const data = await response.json();
      setTimeout(() => {
          sendQuote(selectedUser._id, {
            text: data.body
          })
      }, 3000);
    } catch (error) {
      console.error("Error getting answer from jsonplaceholder api", error.message);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSendMessage}>
        <div className="wrap">
          <input
            type="text"
            className="form_field"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="btn"
            disabled={!text.trim() && !imagePreview}
          >
          Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;