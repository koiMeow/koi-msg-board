import { useState } from "react";
import { v4 } from "uuid";

import Post from "./Post";

const Main = ({ msgList, add, register, login, logout, isLoggedIn, user }) => {
  const tabs = ["匿名留言", "開發中..."];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const [formData, setFormData] = useState({
    message: "",
    time: "",
  });

  // 註冊及登入帳號
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    await register(email, password);
  };

  const handleSignIn = async () => {
    await login(email, password);
  };

  const handleSignOut = async () => {
    await logout();
    setEmail("");
    setPassword("");
  };

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
        {isLoggedIn ? (
          <>
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
          </>
        ) : (
          <div></div>
        )}
      </div>
      <div className="bottom">
        {isLoggedIn ? (
          <>
            <div className="input-area">
              <div className="useremail">{user.email}</div>
              <input
                type="text"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <button onClick={sendMessage}>送出</button>
            </div>
            <button className="function-button" onClick={handleSignOut}>
              登出
            </button>
          </>
        ) : (
          <>
            <div></div>
            <div className="login-area">
              <input
                type="email"
                placeholder="信箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="function-button" onClick={handleSignIn}>
                登入
              </button>
              <button className="function-button" onClick={handleSignUp}>
                註冊
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Main;
