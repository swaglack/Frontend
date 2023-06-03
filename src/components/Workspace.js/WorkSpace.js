import React, { useState, useEffect } from "react";
import axios from "axios";

const SlackComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://slack.com/api/conversations.history", // Replace with actual Slack API endpoint
        {
          method: "get",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer YOUR_SLACK_TOKEN`,
          },
          params: {
            channel: "YOUR_CHANNEL_ID",
          },
        }
      );

      setMessages(result.data.messages);
    };

    fetchData();
  }, []);

  return (
    <div>
      {messages.map((message, index) => (
        <p key={index}>{message.text}</p>
      ))}
    </div>
  );
};

export default SlackComponent;
