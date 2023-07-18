"use client";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState([
    {
      message: "Type hello to start the conversation",
      sender: "Bot",
    },
  ]);

  const [auth, setAuth] = useState(false)

  const handleSend = async (message) => {
    const newMsg = {
      message: message,
      sender: "user",
    };
    setMessage((prevMessages) => [...prevMessages, newMsg]);
  };

  const lastMessage = message.length > 0 ? message[message.length - 1] : null;

  if(lastMessage.sender === "user" && lastMessage.message === "hello" && !auth){
    const msg = {
      message: "Hello, for continue the conversation type you username and passwor for validation",
      sender:"Bot"
    }
    setMessage((prevMessages => [...prevMessages, msg]))
  }
  if (lastMessage.sender === "Bot" && !auth) {
    const objetoJSON = JSON.stringify(lastMessage.message);
    localStorage.setItem('user', objetoJSON)
  }
  
  
  return (
    <div className="h-screen flex items-center justify-center">
      <MainContainer className="h-[60vh] w-[40vw]">
        <ChatContainer>
          <MessageList>
            {message.map((message, i) => {
              return <Message key={i} model={message} />;
            })}
          </MessageList>
          <MessageInput placeholder="Ask me anything" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
