import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

import Buttons from "./Buttons";

export default function TypeArea({ barState, sendMessage }) {
  const [message, setMessage] = useState("");

  const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(1),
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: barState ? "61%" : "75%",
      },
    },
    enddisplay: {
      position: "fixed",
      top: 528,
      marginLeft: -1,
    },
  }));

  const classes = useStyles();

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Send message to backend
    sendMessage(message);
    setMessage("");
  };

  return (
    <div
      className={classes.enddisplay}
      style={{ width: barState ? "44.35%" : "66.6%" }}
    >
      <Box
        component="span"
        display="block"
        bgcolor="background.paper"
        style={{ padding: -5 }}
      >
        <form className={classes.root} noValidate autoComplete="off">
          <Buttons icon="drag_indicator" name="Attach" color="inherit" />
          <TextField
            id="outlined-textarea"
            label="Type a message"
            multiline
            variant="outlined"
            autoFocus={true}
            rowsMax={2}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" ? handleSendMessage(e) : null} 
            value={message}
          />
          <Buttons
            icon="send"
            name="Send"
            color="primary"
            sendMessage={(e) => handleSendMessage(e)}
          />
        </form>
      </Box>
    </div>
  );
}
