import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import styled from "styled-components";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";

function App() {
  return (
    <Router>
      <Container>
        <Header />
        <Main>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Main>
      </Container>
    </Router>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 38px minmax(0, 1fr);
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 260px auto;
`;
