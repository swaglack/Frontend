import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthApi } from "../shared/api";
import axios from "axios";

// 닉네임 정규식
const nicknameRegex = /^[A-Za-z0-9]{3,}$/;

// 비밀번호 정규식
const passwordRegex = /^.{4,}$/;

//이메일 정규식
const userNameRegex =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

function Signup() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState({
    value: "",
    err: null,
  });

  const [nickName, setNickName] = useState({
    value: "",
    err: null,
  });

  const [userPwd, setUserPwd] = useState({
    value: "",
    err: null,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    err: null,
  });

  const handleUsernameChange = (event) => {
    const inputUserName = event.target.value;
    setUserName((prevUserName) => ({
      ...prevUserName,
      value: inputUserName,
    }));
  };

  const handleNicknameChange = (event) => {
    const inputNickName = event.target.value;
    setNickName((prevNickName) => ({
      ...prevNickName,
      value: inputNickName,
    }));
  };

  const handlePasswordChange = (event) => {
    const inputUserPwd = event.target.value;
    setUserPwd((prevUserPwd) => ({
      ...prevUserPwd,
      value: inputUserPwd,
    }));
  };

  const handleCheckpasswordChange = (event) => {
    const inputConfirmPassword = event.target.value;
    setConfirmPassword((prevConfimPw) => ({
      ...prevConfimPw,
      value: inputConfirmPassword,
    }));
  };

  const verifySiginUpData = () => {
    // 유효성 검사 결과 저장
    const verifiedUsername = userNameRegex.test(userName.value);

    const verifiedNickname = nicknameRegex.test(nickName.value);
    const verifiedPassword = passwordRegex.test(userPwd.value);
    const verifiedConfirmPassword = userPwd.value === confirmPassword.value;

    setUserName((prevUserName) => ({
      ...prevUserName,
      err: !verifiedUsername,
    }));

    setNickName((prevNickName) => ({
      ...prevNickName,
      err: !verifiedNickname,
    }));

    setUserPwd((prevUserPwd) => ({
      ...prevUserPwd,
      err: !verifiedPassword,
    }));

    setConfirmPassword((prevConfimPw) => ({
      ...prevConfimPw,
      err: !verifiedConfirmPassword,
    }));
    return !verifiedUsername ||
      !verifiedNickname ||
      !verifiedPassword ||
      !verifiedConfirmPassword
      ? false
      : true;
  };
  const handleSubmit = async () => {
    const signUpVerfy = verifySiginUpData();
    if (signUpVerfy) {
      axios
        .post(
          "https://api.swaglack.site/api/signup", // 미리 약속한 주소
          {
            userName: userName.value,
            nickName: nickName.value,
            userPwd: userPwd.value,
          }, // 서버가 필요로 하는 데이터를 넘겨주고,
          { headers: {} } // 누가 요청했는 지 알려줍니다. (config에서 해요!)
        )
        .then(function (response) {
          navigate("/");
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      return;
    } else {
      // 회원가입 부적합으로 함수 종료
      return;
    }
  };

  return (
    <SignupBox>
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
      <form>
        <div>
          <label htmlFor="userName">이메일주소</label>
          <br />
          <InputBox
            type="email"
            id="userName"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="nickName">닉네임</label>
          <br />
          <InputBox type="text" id="nickName" onChange={handleNicknameChange} />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <br />
          <InputBox
            type="password"
            id="password"
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label htmlFor="checkpassword">비밀번호확인</label>
          <br />
          <InputBox
            type="password"
            id="checkpassword"
            onChange={handleCheckpasswordChange}
          />
        </div>

        <ButtonBox onClick={handleSubmit}>회원가입</ButtonBox>
      </form>
      <div>
        <Link to={"/Login"} style={{ color: "grey" }}>
          이미 회원이신가요?
        </Link>
      </div>
    </SignupBox>
  );
}

export default Signup;

const SignupBox = styled.div`
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
