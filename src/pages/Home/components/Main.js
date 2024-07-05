import { useState } from "react";
import { v4 } from "uuid";

import Post from "./Post";

const Main = ({ msgList, add, isLoggedIn }) => {
  const tabs = ["匿名留言", "開發中..."];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const [formData, setFormData] = useState({
    message: "",
    time: "",
  });

  // 註冊及登入帳號

  // 輸入訊息
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
      time: new Date(),
    });

    setFormData({ message: "" });
  };

  return (
    <>
      <div className="main">
        <div className="tabs">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="content">
          {msgList.map((msg) => {
            return <Post key={msg.id} message={msg} />;
          })}
        </div>
      </div>
      <div className="bottom">
        {isLoggedIn ? (
          <>
            <input
              type="text"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage}>送出</button>
          </>
        ) : (
          <>
            <div></div>
            <div className="logginarea">
              <>帳號</>
              <input />
              <>密碼</>
              <input />
              <button className="function-button">登入</button>
              <button className="function-button">註冊</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Main;
