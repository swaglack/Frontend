import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

const WorkspaceComponent = () => {
  const [workspaceName, setWorkspaceName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalValue, setModalValue] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("User is logged in");
    }
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsSubmitting(true);

    axios
      .post(
        "https://api.swaglack.site/api/workspace",
        {
          workspaceName,
          workspaceMaster: userName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      )
      .then(function (response) {
        setModalValue(response.data);
        setIsSubmitting(false);
      })
      .catch(function (error) {
        setIsSubmitting(false);
        console.log(error);
      });
  };

  const handleWorkspaceChange = event => {
    setWorkspaceName(event.target.value);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}> {workspaceName || "Open Workspace"}</button>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Modal</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" value={workspaceName} onChange={handleWorkspaceChange} placeholder="Enter workspace" />
          <button type="submit" disabled={isSubmitting}>
            Add Workspace
          </button>
        </form>
        <p>{modalValue}</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default WorkspaceComponent;
