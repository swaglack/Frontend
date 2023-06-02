import React from "react";
// import io from "socket.io-client";
// import { SOCKET_URL } from "config";

export const SocketContext = React.createContext();

export const io = require("socket.io-client");
export const socket = io.connect("https://api.swaglack.site", { transports: ["websocket"] });
