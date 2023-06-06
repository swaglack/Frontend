import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Main = () => {
  const navigate = useNavigate();

  const onClickSingupHandler = () => {
    navigate("/signup");
  };

  const onClickLonginHandler = () => {
    navigate("/login");
  };
  return (
    <>
      <MainBackground>
        <MainBox>
          <div style={{ display: "inline-block", verticalalign: "top" }}>
            <img
              style={{
                transform: "scale(1.1)",
                height: "30px",
              }}
              src="img\Slack-mark-RGB.png"
              alt="swaglack"
            />
            <div
              style={{
                display: "inline-block",
                color: "white",
                margin: "10px",
              }}
            >
              <h2>SWAGLACK</h2>
            </div>
          </div>
          <div>
            <TitleDiv
              style={{
                fontWeight: 900,
                color: "white",
                fontSize: "40px",
                fontFamily: "'Noto Sans KR', sans-serif",
              }}
            >
              SWAGLACK은 어디에 있든 팀을 하나로
            </TitleDiv>
          </div>

          <ButtonDiv>
            <ButtonBox onClick={() => onClickSingupHandler()}>
              회원가입
            </ButtonBox>
            <ButtonBox onClick={() => onClickSingupHandler()}>로그인</ButtonBox>
          </ButtonDiv>
          <TextDiv>
            <span
              style={{
                color: " #c9b9c2",
                fontSize: "15px",
              }}
            >
              웹 브라우저에서 로그인하면 여기로 다시 이동합니다.
            </span>
          </TextDiv>
        </MainBox>
      </MainBackground>
    </>
  );
};

export default Main;

const MainBackground = styled.div`
  background-color: #4a154b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-image: url("https://ifh.cc/g/3tpZgJ.png");
  background-repeat: no-repeat;
  background-size: cover;
`;
const ButtonBox = styled.button`
  width: 301px;
  height: 44px;
  border-radius: 5px;
  border: none;
  outline: none;
  color: white;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  background-color: #007a5a;
  transition: all 0.1s;
  :hover {
    background-color: #148567;
  }
`;
const MainBox = styled.div`
  margin: 0 0 130px 100px;
`;
const EntrySecSpan = styled.div`
  margin-bottom: 50px;
`;
const TitleDiv = styled.div`
  margin-top: 10px;
  width: 400px;
  line-height: 110%;
`;
const ButtonDiv = styled.div`
  margin-top: 40px;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: left;
  flex-direction: column;
`;
const TextDiv = styled.div`
  margin-top: 20px;
`;
