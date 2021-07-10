import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root2: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Titles({ name }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root2}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
              {name}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
