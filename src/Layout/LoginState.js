import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

function LoginState() {
  const navigate = useNavigate();
  const [renderTrigger, setRenderTrigger] = useState(false);
  const [nickName, setNickName] = useState(
    JSON.parse(localStorage.getItem("nickName"))
  );
  const [isSignIn, setIsSignIn] = useState(
    JSON.parse(localStorage.getItem("isSignIn"))
  );

  //로그아웃핸들러
  const signOutHandler = () => {
    localStorage.clear();
    alert("로그아웃");
    navigate("/");
    setNickName("");
    setIsSignIn(false);
  };

  //강제리렌더링해서 로그인하자마자 로그인상태변경해야함..
  // useEffect(() => {
  //   localStorage.getItem("nickName"); //실행하고싶은 함수
  // }, []);

  // useEffect(() => {
  //   isSignIn; //실행하고싶은 함수
  // }, [renderTrigger]);

  // useEffect(() => {
  //   if (localStorage.getItem("isSignIn")) {
  //     // navigate("/");
  //   }
  // }, [renderTrigger]);

  // useEffect(() => {
  //   실행하고싶은함수
  // }, [의존성배열]);;

  //로그인 후
  const onSignIn = (
    <LogonBar>
      <div></div>
      <div />
      <img
        style={{ transform: "scale(0.4)", height: "90px" }}
        src={"https://i.imgur.com/6VBx3io.png"}
      />
      <div>{nickName}</div>
      <div>
        <button onClick={signOutHandler}>로그아웃</button>
      </div>
    </LogonBar>
  );
  //로그인 전
  const offSignIn = (
    <LogonBar>
      <Link to={"/Signup"}>
        <button>회원가입</button>
      </Link>
      <Link to={"/Login"}>
        <button>로그인</button>
      </Link>
    </LogonBar>
  );
  return <div>{isSignIn ? onSignIn : offSignIn}</div>;
}

export default LoginState;

const LogonBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 500px;
  gap: 10px;
`;
