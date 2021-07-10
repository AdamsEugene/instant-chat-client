import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import ButtonsTemp from "./ButtonsTemp";
import Titles from "./Titles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "96%",
    },
    justifyContent: "center",
  },
  root1: {
    flexGrow: 1,
  },
  paper: {
    height: 500,
    width: "60%",
    margin: "auto",
    marginTop: 50,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [next, setNext] = useState(false);

  const handleInputChanges = (type, value) => {
    switch (type) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  // hadleSubmitDetails
  const hadleSubmitDetails = (type, e) => {
    e.preventDefault();

    if (type === "login") {
      if (email !== "" && password !== "") {
        // history.push({ pathname: "/", state: data });
        setNext(true);
      }
    }
  };

  console.log(email);
  console.log(password);
  const reg = () => (
    <>
      <Titles name="Login" />
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          label="Email"
          type="text"
          onChange={(e) => handleInputChanges("email", e.target.value)}
          value={email}
        />
        <TextField
          label="Password"
          type="password"
          style={{ marginBottom: "15px" }}
          onChange={(e) => handleInputChanges("password", e.target.value)}
          value={password}
        />
        <ButtonsTemp mg={false} hadleSubmitDetails={hadleSubmitDetails} />
      </form>
      {next ? (
        <Redirect
          to={{
            pathname: "/",
            state: { email, password },
          }}
        />
      ) : null}
    </>
  );

  return (
    <Grid container className={classes.root1} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={4}>
          {["", reg(), ""].map((value, i) => (
            <Grid key={i} item>
              <Paper elevation={3} className={classes.paper}>
                {value}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
