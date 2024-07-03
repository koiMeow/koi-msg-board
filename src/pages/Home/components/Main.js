import { useState } from "react";

import Post from "./Post";

const Main = () => {
  const [activeTab, setActiveTab] = useState("熱門看板");
  const tabs = ["熱門看板", "分類看板"];

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
        <Post
          msg={"測試訊息"}
        />
      </div>
    </div>
  );
};

export default Main;
