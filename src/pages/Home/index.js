import Top from "./components/Top";
import Main from "./components/Main";

import "./css/index.css";
import { useEffect, useState } from "react";
import { db, collection, addDoc, onSnapshot } from "../../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
  // 聊天訊息資料
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
      const messageData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      messageData.sort((b, a) => a.time - b.time);
      setData(messageData);
    });

    return () => unsubscribe();
  }, []);

  const addMessage = (formData) => addDoc(collection(db, "messages"), formData);

  // 使用者帳號密碼資料
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const createAccount = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.alert("註冊成功");
    } catch (error) {
      window.alert("註冊失敗: " + error.message);
    }
  };

  const loginAccount = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const logoutAccount = () => {
    signOut(auth);
  };

  return (
    <div>
      <Top />
      <Main
        msgList={data}
        add={addMessage}
        register={createAccount}
        login={loginAccount}
        logout={logoutAccount}
        isLoggedIn={!!user}
        user={user}
      />
    </div>
  );
};

export default Home;
