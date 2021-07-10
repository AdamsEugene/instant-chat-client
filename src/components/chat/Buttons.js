import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 8,
    height: 54,
    // color: "inherit"
  },
}));

export default function Buttons({ icon, name, color, sendMessage }) {
  const classes = useStyles();

  return (
    <span>
      <Button
        variant="outlined"
        color={color}
        className={classes.button}
        endIcon={<Icon>{icon}</Icon>}
        onClick={sendMessage}
      >
        {name}
      </Button>
    </span>
  );
}
