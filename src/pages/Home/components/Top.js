import { useState } from "react";
import { v4 } from "uuid";

const Top = ({ add }) => {
  const [formData, setFormData] = useState({
    message: "",
  });

  const handleChange = (e) => {
    const msg = e.target.value;
    setFormData({
      message: msg,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!formData.message) return;

    await add({
      id: v4(),
      message: formData.message,
    });

    setFormData({ message: "" });
  }

  return (
    <>
      <div className="top">
        <button className="home-button">扣以的留言板</button>
        <div className="contact-buttons">
          <button>聯絡資訊</button>
          <button>關於我們</button>
        </div>
      </div>
      <div className="bottom">
        <input
          type="text"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>送出</button>
      </div>
    </>
  );
};

export default Top;
