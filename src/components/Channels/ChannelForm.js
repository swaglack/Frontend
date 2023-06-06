import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useSelector } from "react-redux";
import workSpace from "../Workspace/WorkSpace";

Modal.setAppElement("#root");

const CreateChannel = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [channels, setChannels] = useState([]);

  const workspaceId = useSelector(state => state.workspace.workspaceId);

  const validateChannelName = name => {
    const regex = /^[a-z0-9\_\-]+$/i;
    return regex.test(name);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // User is already logged in, perform necessary actions
      console.log("User is logged in");
      fetchChannels(token); // Fetch channels when the user is logged in
    }
  }, []);

  const fetchChannels = async token => {
    try {
      const response = await axios.get(`https://api.swaglack.site/api/workspace/:${workspaceId}/channels`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8'",
          Authorization: localStorage.getItem("Authorization"),
        },
      });

      setChannels(prevChannels => [...prevChannels, ...response.data]);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data, { position: "bottom-center" });
    }
  };

  const handleChannelNameChange = event => {
    const value = event.target.value;
    setChannelName(value);
    setIsInvalid(!validateChannelName(value));
  };

  const handleCreateChannel = async () => {
    if (channelName && !isInvalid) {
      try {
        const token = localStorage.getItem("token");
        const channelData = {
          channelName: channelName,
          workspaceId: workspaceId,
        };

        await axios.post(`https://api.swaglack.site/api/workspace/:${workspaceId}/channel`, channelData, {
          headers: {
            "Content-Type": "application/json; charset=utf-8'",
            Authorization: localStorage.getItem("Authorization"),
          },
        });

        setChannelName("");
        fetchChannels(token);
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
        {channels.map(channel => (
          <ChannelList key={channel.channelId}>{channel.channelName}</ChannelList>
        ))}
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

export default CreateChannel;

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
