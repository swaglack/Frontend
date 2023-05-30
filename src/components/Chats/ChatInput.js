import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import io from "socket.io-client";
import { socket } from "../Socket/socket";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const history = useNavigate();

  const name = "userId";
  const workspace = "Your Workspace";
  const channel = "Your Channel";

  const MessageSend = () => {
    const input = document.getElementById("test");
    const message = input.value;
    input.value = "";

    setMessages(prevMessages => [...prevMessages, { text: message, isUser: true }]);
  };

  useEffect(() => {
    // Check if the token is available
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   Navigate("/login"); // Redirect to the login screen if token is not available
    //   return;
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

    return () => {
      socket.off("update");
    };
  }, [history]);

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

  return (
    <Container>
      <ChatArea id="chat">
        {messages.map((message, index) => (
          <Message key={index} isUser={message.isUser}>
            {message.text}
          </Message>
        ))}
      </ChatArea>
      <div>
        <Input type="text" id="test" placeholder="메세지를 넣어주세요..." />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </Container>
  );
};

const Message = ({ isUser, children }) => {
  return <div className={isUser ? "user-message" : "other-message"}>{children}</div>;
};

const Container = styled.div`
  margin: auto;
  margin-top: 100px;
  border-radius: 20px;
  background-color: whitesmoke;
  text-align: center;
  width: 1300px;
  height: 700px;
  margin-top: 10px;
`;

const ChatArea = styled.div`
  height: 90%;
  width: 100%;
  overflow-y: auto;
`;

const Input = styled.input`
  padding: 10px 300px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;

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
  padding: 10px 100px;
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

export default ChatComponent;
