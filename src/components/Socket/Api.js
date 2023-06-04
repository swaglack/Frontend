// // api.js
// import axios from "axios";

// const instance = axios.create({
//   baseURL: "https://api.swaglack.site",
//   timeout: 1000,
//   headers: { "X-Custom-Header": "foobar" },
// });

// export const createChannel = async channelName => {
//   try {
//     const response = await instance.post("/api/workspace/:workspaceid/channel", { name: channelName });
//     return response.data;
//   } catch (error) {
//     console.error("Failed to create channel", error);
//     return null;
//   }
// };

// export default {
//   instance,
//   createChannel,
// };
