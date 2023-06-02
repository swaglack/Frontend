import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root"); // 이 줄은 모달이 올바르게 스크린 리더와 작동하도록 하는 것입니다. 접근성을 위해 필요합니다.

function CreateChannelModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

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
        const res = await axios.post("https://api.swaglack.site/api/workspace/:workspaceid/channel", {
          name: channelName,
        });
        console.log(res.data);
        setModalIsOpen(false);
      } catch (error) {
        console.error("Failed to create channel", error);
      }
    }
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Create Channel</button>
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
