import React from "react";
import io from "socket.io-client";
// import { SOCKET_URL } from "config";

export const SocketContext = React.createContext();

export const socket = io.connect("url, { transports: ["websocket"] });
