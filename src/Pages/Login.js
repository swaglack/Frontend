import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthApi } from "../shared/api";
import axios from "axios";
import Cookies from "js-cookie";

//서버에서 응답받은 JWT의 payload 데이터가 프론트에 필요할 때가 있다.
const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState({
    value: "",
    err: null,
  });
  const [userPwd, setUserPwd] = useState({
    value: "",
    err: null,
  });

  const handleEmailChange = (event) => {
    const inputUserName = event.target.value;
    setUserName((prevUserName) => ({
      ...prevUserName,
      value: inputUserName,
    }));
  };

  const handlePasswordChange = (event) => {
    const inputUserPwd = event.target.value;
    setUserPwd((prevUserPwd) => ({
      ...prevUserPwd,
      value: inputUserPwd,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userName.value && userPwd.value) {
      axios
        .post(
          "https://api.swaglack.site/api/login", // 미리 약속한 주소
          { userName: userName.value, userPwd: userPwd.value }, // 서버가 필요로 하는 데이터를 넘겨주고,
          { body: {} } // 누가 요청했는 지 알려줍니다. (config에서 해요!)
        )
        .then(function (response) {
          // navigate("/");
          // console.log(response);

          // const expirationDate = new Date();
          // const setCookie = `Bearer ${response.data.token}`;
          // expirationDate.setTime(
          //   expirationDate.getTime() + 24 * 60 * 60 * 1000
          // );
          // document.cookie = `authorization=${encodeURIComponent(
          //   setCookie
          // )}; expires=${expirationDate.toUTCString()}; path=/`;

          // // 세선 스토리지에 닉네임 저장
          // sessionStorage.setItem(
          //   "nickname",
          //   JSON.stringify(parseJwt(response.data.token).nickname)
          // );
          // sessionStorage.setItem("isSignIn", JSON.stringify(true));
          const { token } = response.data;
          if (token) {
            Cookies.set("userName", token);
          }

          alert("로그인에 성공했습니다.");
          navigate("/");
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("닉네임 또는 비밀번호가 입력되지 않았습니다.");
      return;
    }
  };

  return (
    <SigninBox>
      <Link to="/">
        <h2>
          <img
            style={{ transform: "scale(0.4)", height: "200px" }}
            src="img\Slack-mark-RGB.png"
            alt="swaglack"
          />
          <br />
        </h2>
      </Link>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <InputBox type="email" id="email" onChange={handleEmailChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <InputBox
            type="password"
            id="password"
            onChange={handlePasswordChange}
          />
        </div>
        <ButtonBox type="submit" onClick={handleSubmit}>
          로그인
        </ButtonBox>
      </form>
    </SigninBox>
  );
}

export default Login;

const SigninBox = styled.div`
  height: 680px;
  border: 1px solid none;
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InputBox = styled.input`
  color: black;
  font-weight: 500;
  font-size: 23px;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 427px;
  height: 30px;
  border-radius: 5px;
  border: 0.5px solid grey;
`;

const ButtonBox = styled.div`
  font-weight: 600;
  font-size: 23px;
  padding: 10px;
  color: white;
  background-color: purple;
  font-weight: 500;
  width: 427px;
  height: 30px;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 10px;
  :hover {
    cursor: pointer;
    background-color: darkviolet;
  }
`;
