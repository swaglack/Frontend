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

const CreateChannelModalWrapper = styled.div`
  /* Styles for modal container */
`;

const CreateChannelModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewChat, setViewChat] = useState(false);
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
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
  };

  const handleCreateChannel = async () => {
    try {
      await axios
        .post("https://api.swaglack.site/api/workspace/:workspaceid/channel ", channelName, {
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
        <Button onClick={handleCreateChannel}>Create</Button>
        <Button onClick={() => setModalIsOpen(false)}>Cancel</Button>
      </Modal>
    </CreateChannelModalWrapper>
  );
};

export default CreateChannelModal;
