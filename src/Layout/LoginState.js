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

  useEffect(() => {
    const isSignedIn = localStorage.getItem("isSignIn");
    if (isSignedIn) {
      setIsSignIn(isSignedIn);
    }
  }, [navigate]);

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
