import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "94%",
    },
  },
}));

export default function SearchUser({ handelKeypress, value, setSearch }) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="filled-basic"
        label="Search ..."
        variant="outlined"
        value={value}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" ? handelKeypress(e) : null}
      />
    </form>
  );
}
