  import Top from "./components/Top";
  import Main from "./components/Main";

  import "./index.css";
  import { useEffect, useState } from "react";
  import { db, collection, addDoc, onSnapshot } from "../../firebase";

  const Home = () => {
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
    
    return (
      <div>
        <Top add={addMessage} />
        <Main msgList={data} />
      </div>
    );
  };

  export default Home;
