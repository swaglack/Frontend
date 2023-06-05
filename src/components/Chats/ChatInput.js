import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { socket } from "../Socket/socket";
import toast from "react-toastify";

const ChatInput = () => {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const nickName = localStorage.getItem("nickName");
    // console.log(nickName);
    setName("");
    socket.emit("newUser", nickName, "", "");

    socket.on("update", data => {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          type: data.type,
          sender: data.name,
          receiver: data.name,
          text: data.message,
        },
      ]);
    });
  }, []);

  const sendMessage = () => {
    const messageInput = document.getElementById("test");
    const message = messageInput.value;
    messageInput.value = "";
    setMessages(prevMessages => [
      ...prevMessages,
      {
        type: "message",
        sender: name,
        receiver: name,
        text: message,
      },
    ]);
    socket.emit("message", { type: "message", message });
  };
  return (
    <Container id="main">
      <ChatArea id="chat">
        {messages.map((message, index) => (
          <Message key={index} isCurrentUser={message.sender === name}>
            <Sender>{message.sender}:</Sender>
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
  background-color: white;
  text-align: left;
  width: 1200px;
  height: 600px;
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
  width: 500px;
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

export default ChatInput;
