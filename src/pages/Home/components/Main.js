import { useState } from "react";

import Post from "./Post";

const Main = ({ msgList }) => {
  const tabs = ["匿名留言", "開發中..."];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
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
          return (<Post key={msg.id} message={msg} />)
        })}
      </div>
    </div>
  );
};

export default Main;
