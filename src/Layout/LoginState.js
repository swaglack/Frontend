import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Cookies from "js-cookie";
import axios from "axios";
import styled from "styled-components";

function LoginState() {
  const [nickName, setNickName] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);

  const signOutHandler = () => {
    Cookies.remove("userName"); //??
    sessionStorage.clear();
    alert("로그아웃 했습니다.");
    setNickName("");
    setIsSignIn(false);
  };

  useEffect(() => {
    const fetchNickname = async () => {
      const token = Cookies.get("userName");
      if (token) {
        try {
          const response = await axios.get(
            "https://api.swaglack.site/api/userName/nickname",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const { nickName } = response.data;
          setNickName(nickName);
          setIsSignIn(true);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchNickname();
  }, []);

  const onSignIn = (
    <>
      <img src={"https://i.imgur.com/6VBx3io.png"} />
      <div>{nickName}</div> <button onClick={signOutHandler}>로그아웃</button>
    </>
  );
  const offSignIn = (
    <offSignInBox>
      <Link to={"/Signup"}>
        <button>회원가입</button>
      </Link>
      <Link to={"/Login"}>
        <button>로그인</button>
      </Link>
    </offSignInBox>
  );

  return <div>{isSignIn ? onSignIn : offSignIn}</div>;
}

export default LoginState;

const LogonBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const offSignInBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
