import React, { useEffect, useState } from "react";
import { navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { socket } from "../Socket/socket";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const history = useNavigate();

  // useEffect(() => {
  //   const name = Cookies.get("name");
  //   console.log(name);
  // });
  const name = "";
  const workspace = "testWS";
  const channel = "testCN";

  const sendMessage = () => {
    const messageInput = document.getElementById("test");
    const message = messageInput.value;
    messageInput.value = "";

    const chat = document.getElementById("chat");
    const msg = document.createElement("div");
    const node = document.createTextNode(message);
    msg.classList.add("me");
    msg.appendChild(node);
    chat.appendChild(msg);

    socket.emit("message", { type: "message", message });
  };

  useEffect(() => {
    // // const token = localStorage.getItem("cookie");
    // // if (!cookie) {
    // //   // navigate("/login"); // Redirect to the login screen if token is not available
    // //   return;
    // }

    socket.emit("newUser", name, workspace, channel);

    socket.on("update", data => {
      const chat = document.getElementById("chat");
      const message = document.createElement("div");
      const node = document.createTextNode(`${data.name}: ${data.message}`);
      let className = "";

      switch (data.type) {
        case "message":
          className = "other";
          break;
        case "connect":
          className = "connect";
          break;
        case "disconnect":
          className = "disconnect";
          break;
      }

      message.classList.add(className);
      message.appendChild(node);
      chat.appendChild(message);
    });
  }, []);

  // return () => {
  //   socket.on("update");
  // };
  // // }, [history]);

  // const Message = ({ isUser, children }) => {
  //   return <div className={isUser ? "user-message" : "other-message"}>{children}</div>;
  // };

  return (
    <Container id="main">
      <ChatArea id="chat">
        {messages.map((message, text) => (
          <Message key={text} isCurrentUser={message.sender === name}>
            {message.sender !== name && <Sender>{message.sender}:</Sender>}
            {message.text}
          </Message>
        ))}
      </ChatArea>
      <MessageInputContainer>
        <Input type="text" id="test" placeholder="메세지를 넣어주세요..." />
        <Button onClick={sendMessage}>Send</Button>
      </MessageInputContainer>
    </Container>
  );
};

const Message = styled.div`
  background-color: ${({ isCurrentUser }) => (isCurrentUser ? "#4a154b" : "#f5f5f5")};
  color: ${({ isCurrentUser }) => (isCurrentUser ? "white" : "black")};
  padding: 10px;
  margin-bottom: 10px;
`;

const Container = styled.div`
  margin: auto;
  margin-top: 100px;
  border-radius: 8px;
  background-color: #f5f5f5;
  text-align: left;
  width: 600px;
  height: 500px;
  margin-top: 10px;
`;

const ChatArea = styled.div`
  height: 85%;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
`;

const MessageInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: white;
  border-top: 1px solid #f5f5f5;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
  flex-grow: 1;

  &:hover {
    border-color: #888888;
  }

  &:focus {
    border-color: #4a154b;
    box-shadow: 0 0 0 2px #4a154b1a;
  }

  &::placeholder {
    color: #888888;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4a154b;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #5e1e66;
  }
`;

const Sender = styled.span`
  font-weight: bold;
  margin-right: 4px;
`;

const ChannelList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Channel = styled.div`
  padding: 5px;
  margin-bottom: 5px;
  background-color: ${({ active }) => (active ? "#4a154b" : "#f5f5f5")};
  color: ${({ active }) => (active ? "white" : "black")};
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? "#5e1e66" : "#e0e0e0")};
  }
`;

export default ChatComponent;
