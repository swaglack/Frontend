import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserDetail from "./UserDetail";

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
      <UserDetail />
      <div>{/* <button onClick={signOutHandler}>로그아웃</button> */}</div>
    </LogonBar>
  );
  //로그인 전
  const offSignIn = (
    <LogonBar>
      {/* <Link to={"/Signup"}>
        <SignupButton>회원가입</SignupButton>
      </Link>
      <Link to={"/Login"}>
        <SignupButton>로그인</SignupButton>
      </Link> */}
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

// const SignupButton = styled.button`
//   width: 100px;
//   height: 30px;
//   border-radius: 5px;
//   border: none;
//   outline: none;
//   color: white;
//   font-size: 15px;
//   font-weight: 700;
//   cursor: pointer;
//   background-color: #007a5a;
//   transition: all 0.1s;
//   :hover {
//     background-color: #148567;
//   }
// `;
