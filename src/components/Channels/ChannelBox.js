import React from "react";
import styled from "styled-components";
import axios from "axios";

const ChannelBox = ({ SetChannels, channel, SetChannel, Channel }) => {
  const onClickHandler = () => {
    SetChannel(channel.room);
    axios
      .post("https://api.swaglack.site", { room: channel })
      .then(response => {
        localStorage.setItem("channel", channel);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return <ChannelTxt onClick={onClickHandler}>{channel}</ChannelTxt>;
};

const ChannelTxt = styled.div`
  padding: 4px 20px 4px 20px;
  :hover {
    background-color: #350d36;
    cursor: pointer;
    color: white;
  }
`;

export default ChannelBox;
