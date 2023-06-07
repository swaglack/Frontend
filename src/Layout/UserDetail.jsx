import React, { useState } from "react";
import styled from "styled-components";
import UserInfo from "./UserInfo";

const UserDetail = () => {
  const [isOpen, SetisOpen] = useState(false);
  const [nickName, setNickName] = useState(
    JSON.parse(localStorage.getItem("nickName"))
  );

  return (
    <div>
      <UserBox onClick={() => SetisOpen(!isOpen)}>
        <img
          style={{ transform: "scale(0.4)", height: "90px" }}
          src={"https://i.imgur.com/6VBx3io.png"}
        />
        <div>{nickName}</div>
      </UserBox>
      {isOpen && <UserInfo />}
    </div>
  );
};

const UserBox = styled.div`
  position: relative;
  padding: 2px;
  font-weight: 700;
  font-size: 20px;
  height: 88px;
`;

export default UserDetail;
