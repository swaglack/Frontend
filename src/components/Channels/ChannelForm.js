import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-toastify";
import styled from "styled-components";
import ChatInput from "../Chats/ChatInput";

Modal.setAppElement("#root");

const Button = styled.button`
  /* Styles for button */
`;

const ChannelList = styled.ul`
  cursor: pointer;
  /* Styles for channel list */
`;

const ErrorMessage = styled.p`
  color: red;
  /* Styles for error message */
`;

const CreateChannelModalWrapper = styled.div`
  /* Styles for modal container */
`;

const CreateChannelModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [viewChat, setViewChat] = useState(false);

  const validateChannelName = name => {
    const regex = /^[a-z0-9\_\-]+$/i;
    return regex.test(name);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // User is already logged in, perform necessary actions
      console.log("User is logged in");
    }
  }, []);
  const handleChannelNameClick = () => {
    setViewChat(true);
  };

  if (viewChat) {
    return <ChatInput />;
  }

  const handleChannelNameChange = event => {
    const value = event.target.value;
    setChannelName(value);
    setIsInvalid(!validateChannelName(value));
  };

  const channelData = {
    name: channelName,
  };

  const handleCreateChannel = async () => {
    if (channelName && !isInvalid) {
      try {
        await axios
          .post("https://api.swaglack.site/workspace/:workspaceId/channel ", channelData, {
            headers: {
              "Content-Type": `application/json`,
              Authorization: localStorage.getItem("Authorization"),
            },
          })
          .then(res => {
            console.log(res);
          });

        setChannelName("");
      } catch (error) {
        console.dir(error);
        toast.error(error.response?.data, { position: "bottom-center" });
      }
    }
  };

  return (
    <CreateChannelModalWrapper>
      <Button onClick={() => setModalIsOpen(true)}>Create Channel</Button>
      <div>
        <ChannelList onClick={handleChannelNameClick}>{channelName}</ChannelList>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Create Channel</h2>
        <input value={channelName} onChange={handleChannelNameChange} placeholder="Enter channel name" />
        {isInvalid && <ErrorMessage>Channel name is invalid</ErrorMessage>}
        <Button disabled={isInvalid} onClick={handleCreateChannel}>
          Create
        </Button>
        <Button onClick={() => setModalIsOpen(false)}>Cancel</Button>
      </Modal>
    </CreateChannelModalWrapper>
  );
};

export default CreateChannelModal;
