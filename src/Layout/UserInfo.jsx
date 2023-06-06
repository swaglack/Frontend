import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const [nickName, setNickName] = useState(
    JSON.parse(localStorage.getItem("nickName"))
  );

  const [isSignIn, setIsSignIn] = useState(
    JSON.parse(localStorage.getItem("isSignIn"))
  );

  const navigate = useNavigate();

  // useEffect(() => {
  //   const isSignedIn = localStorage.getItem("isSignIn");
  //   if (isSignedIn) {
  //     setIsSignIn(!isSignedIn);
  //   }
  // }, [navigate]);

  //로그아웃핸들러
  const signOutHandler = () => {
    localStorage.clear();
    alert("로그아웃");
    navigate("/");
    setNickName("");
    setIsSignIn(false);
  };

  return (
    <UserInfoBox>
      <FirstBox>
        <UserImage />
        <div>{nickName}</div>
      </FirstBox>
      <SecondBox>
        <UserInfoMenu>🟢 대화가능</UserInfoMenu>
      </SecondBox>
      <SecondBox>
        <UserInfoMenu>
          <div>
            <div onClick={signOutHandler}>로그아웃</div>
          </div>
        </UserInfoMenu>
      </SecondBox>
    </UserInfoBox>
  );
};

const UserInfoBox = styled.div`
  position: absolute;
  left: 20px;
  width: 330px;
  height: 200px;
  background-color: #f8f8f8;
  border: none;
  border-radius: 7px;
  box-shadow: 0px 3px 3px 0px black;
`;

const FirstBox = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: black;
  display: flex;
  align-items: center;
  padding: 20px 0px 20px 30px;
  border-bottom: 1px solid #d8d8d8;
`;
const SecondBox = styled.div`
  padding: 10px 0px 10px 0px;
  border-bottom: 1px solid #d8d8d8;
`;

const UserImage = styled.div`
  background-color: #5d3d5e;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  position: relative;
  margin-right: 20px;
  background-image: url(https://i.imgur.com/6VBx3io.png);
  background-size: cover;
  background-repeat: no-repeat;
`;

const UserInfoMenu = styled.div`
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 5px 10px 5px 30px;
  color: black;
  :hover {
    font-weight: 800;
    color: white;
    background-color: #1264a3;
    cursor: pointer;
  }
  &.last {
    margin-top: 10px;
  }
  &.plantext {
    font-size: 15px;
    line-height: 150%;
  }
`;

export default UserInfo;
