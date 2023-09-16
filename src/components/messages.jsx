import React, { useContext, useEffect, useState } from "react";
import Message from './message'
import { ChatContext } from "../context/chatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const messages = () => {

  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    }
  }, [data.chatId]);
  console.log(messages)

  return (
    <div className='messages'>
        {messages.map((m) => (
          <Message message={m} key={m.id} />
        ))}
    </div>
  )
}

export default messages