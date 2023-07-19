'use client'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";
import axios from "axios";
import msg from "@/utils/utils";
import { url, urlGoodbye } from '../../utils/urls'

export default function Chatbot() {
  const [message, setMessage] = useState([
    {
      message: "Hello, I'm Your Assistant helper",
      sender: "Bot",
    },
  ]);

  const [auth, setAuth] = useState(false)
  const [id, setId] = useState(null)
  const [error, setError] = useState(false)

  const handleSend = async (message) => {
    const newMsg = {
      message: message,
      sender: "user",
    };
    setMessage((prevMessages) => [...prevMessages, newMsg]);
  };

  const lastMessage = message.length > 0 ? message[message.length - 1] : null;
  const unLastMessage = message.length > 0 ? message[message.length - 2] : null;

  const words = lastMessage.message.toLocaleLowerCase().split(" ")

  if(lastMessage.sender === "user" && words.includes("hello") && !auth){
    setMessage((prevMessages => [...prevMessages, msg]))
  }else if(lastMessage.sender === "user" && words.includes("want") && !auth){
    setMessage((prevMessages => [...prevMessages, msg]))
  }else if (lastMessage.sender === "user" && words.includes("good") && !auth){
    setMessage((prevMessages => [...prevMessages, msg]))
  }
  
  if(message.length > 2 && unLastMessage.message === msg.message) {
    const login = lastMessage;
    const test = login.message;
    const splt = test.split(" ").map(item => item.replace("<br>", ""));

    const request = {
      "userName": splt[0],
      "password": splt[1]
    }
    axios.post(url, request)
      .then(response => {
        setId(response.data.id)
        setAuth(true)
      }).catch(error => {
        console.error('Erro na chamada POST:', error);
      });
    }
    if(lastMessage.message === 'goodbye') {
      const msg = {
          message: "Bye",
          sender: "Bot"
      }
      setMessage((prevMessages => [...prevMessages, msg]) )
        const request = {
          userId: id,
          message: JSON.stringify(message)
        }
        axios.post(urlGoodbye, request)
          .then(response => {
            console.log(response)
          }).catch(error => {
            console.error('Erro na chamada POST:', error);
          })
    }
  return (
    <div className=" w-[45vw] h-[60vh]">
      <MainContainer className="h-[60vh] w-[40vw]">
        <ChatContainer>
          <MessageList>
            {message.map((message, i) => {
                if(message.sender === 'user') {
                    return <Message key={i} model={{
                        message:message.message,
                        sender: message.sender,
                        direction: 'outgoing'
                    }} />
                }
                return <Message key={i} model={{
                    message:message.message,
                    sender: message.sender,
                    direction: 'incoming'
                }} />
                })}
          </MessageList>
          <MessageInput placeholder="Ask me anything" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
