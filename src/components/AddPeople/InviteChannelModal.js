import React, { useState, useCallback } from "react";
import Modal from "@components/Modal";
import axios from "axios";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const InviteChannelModal = ({
  show,
  onCloseModal,
  setShowInviteChannelModal,
}) => {
  const { workspaceㅃ, channel } = useParams();
  const [newMember, setNewMember] = useState("");

  const onChangeNewMember = useCallback((e) => {
    setNewMember(e.target.value);
  }, []);

  const onInviteMember = useCallback(
    (e) => {
      e.preventDefault();
      if (!newMember || !newMember.trim()) {
        return;
      }
      axios
        .post(`/api/workspaces/${workspace}/channels/${channel}/members`, {
          email: newMember,
        })
        .then(() => {
          revalidateMembers();
          setShowInviteChannelModal(false);
          setNewMember("");
        })
        .catch((error) => {
          console.dir(error);
          toast.error(error.response?.data, { position: "bottom-center" });
        });
    },
    [newMember]
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <label htmlFor="member-label">
          <span>채널 멤버 초대</span>
          <input id="member" value={newMember} onChange={onChangeNewMember} />
        </label>
        <button type="submit">초대하기</button>
      </form>
    </Modal>
  );
};

export default InviteChannelModal;
