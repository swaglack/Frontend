import React from "react";
import styled from "styled-components";

function Main() {
  return (
    <MainBox>
      <img
        style={{ transform: "scale(0.6)", height: "300px" }}
        src="img\Slack-mark-RGB.png"
        alt="swaglack"
      />
      <h1>SWAGLACK 환영합니다</h1>
    </MainBox>
  );
}
export default Main;

const MainBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3f0e40;
  color: white;
`;
