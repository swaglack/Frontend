import React, { useEffect, useState } from "react";
import axios from "axios";

const ChannelList = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get("/api/backend/channels");
        setChannels(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchChannels();
  }, []);

  return (
    <div>
      <h2>Channel List</h2>
      <ul>
        {channels.map(channel => (
          <li key={channel.channelId}>
            <span>{channel.channelName}</span>
            <span>{channel.userCount} users</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelList;
