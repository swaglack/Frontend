import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import styled from "styled-components";
import Header from "./Layout/Header";
import Sidebar from "./Layout/SideBar";
import ChatInput from "./components/Chats/ChatInput";
import MainPage from "./Pages/MainPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track the user's login status

  // const handleLogin = () => {
  //   useEffect(() => {
  //     const name = Cookies.get("Nickname");
  //     console.log(name);
  //   });
  //   // Perform login logic
  //   setIsLoggedIn(true);
  // };

  // const handleLogout = () => {
  //   // Perform logout logic
  //   setIsLoggedIn(false);
  // };

  return (
    <Router>
      <Container>
        <Header />

        <Main>
          <Sidebar />

          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Chat" element={<ChatInput />} />
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
