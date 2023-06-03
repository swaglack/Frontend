import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

function CreateChannelModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const userName = localStorage.getItem("userName");
  const workspaceId = localStorage.getItem("workspaceId");

  const handleChannelChat = event => {
    const value = event.target.value;
    setChannelChat(value);
  };

  const validateChannelName = name => {
    const regex = /^[a-z0-9\_\-]+$/i;
    return regex.test(name);
  };

  const handleChannelNameChange = event => {
    const value = event.target.value;
    setChannelName(value);
    setIsInvalid(!validateChannelName(value));
  };

  const handleCreateChannel = async () => {
    if (channelName && !isInvalid) {
      try {
        await axios.post(
          `https://api.swaglack.site/api/workspace/${workspaceId}/channel`,
          { channelName, userName, workspaceId },
          { headers: { Authorization: localStorage.getItem("Authorization") } }
        );

        setChannelName("");
      } catch (error) {
        console.dir(error);
        toast.error(error.response?.data, { position: "bottom-center" });
      }
    }
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Create Channel</button>
      <div>
        <ul
          onClick={() => {
            handleChannelChat();
          }}
        >
          {channelName}
        </ul>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Create Channel</h2>
        <input value={channelName} onChange={handleChannelNameChange} placeholder="Enter channel name" />
        {isInvalid && <p>Channel name is invalid</p>}
        <button disabled={isInvalid} onClick={handleCreateChannel}>
          Create
        </button>
        <button onClick={() => setModalIsOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
}

export default CreateChannelModal;
