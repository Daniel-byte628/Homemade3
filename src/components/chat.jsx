import React, { useContext } from "react";
import Add from '../img/addpeople.png'
import Messages from './messages'
import Input from './input'
import { ChatContext } from "../context/chatContext";

const chat = () => {

  const { data } = useContext(ChatContext);
  
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.nombre}</span>
        <div className="chatIcons">
          <img src={Add} alt="" />
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default chat