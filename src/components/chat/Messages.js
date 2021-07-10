import React, { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Message from "./Message";

const BIURL =
  "https://analyticsindiamag.com/wp-content/uploads/2020/10/7d744a684fe03ebc7e8de545f97739dd.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    height: "100%",
    minHeight: "70.5vh",
    backgroundColor: theme.palette.background.paper,
    backgroundImage: `url(${BIURL})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  },
  admin: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      marginTop: theme.spacing(20),
    },
  },
}));

export default function Messages({
  barState,
  currentUser,
  messages,
  id,
  image,
  groupName,
}) {
  const divRref = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    divRref.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  });

  // console.log(messages, "       ssss");

  return (
    <List className={classes.root} ref={divRref}>
      {messages.length > 0 ? (
        messages.map((message, i) => {
          // console.log(message, " ...................");
          return (
            <Message
              barState={barState}
              key={i}
              me={message.senderId === id}
              currentUser={currentUser}
              message={message}
              admin={message.senderId === "admin"}
              image={image}
            />
          );
        })
      ) : (
        <div className={classes.admin}>
          <Chip avatar={<Avatar>A</Avatar>} label="Start by typing something" />
        </div>
      )}
      {/*  */}
    </List>
  );
}
