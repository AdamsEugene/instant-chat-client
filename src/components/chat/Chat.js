import React from "react";
import TypeArea from "./TypeArea";
import Messages from "./Messages";

export default function Chat({
  barState,
  currentUser,
  messages,
  sendMessage,
  id,
  image,
  groupName,
}) {
  return (
    <span>
      <Messages
        barState={barState}
        currentUser={currentUser}
        messages={messages}
        id={id}
        groupName={groupName}
        image={image}
      />
      <TypeArea barState={barState} sendMessage={sendMessage} />
    </span>
  );
}
