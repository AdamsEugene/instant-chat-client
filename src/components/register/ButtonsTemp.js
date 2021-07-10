import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import FacebookIcon from "@material-ui/icons/Facebook";
import Divider from "@material-ui/core/Divider";
import GTranslateIcon from "@material-ui/icons/GTranslate";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
// import { instance } from "../../apis";

export default function ButtonsTemp({ mg, hadleSubmitDetails }) {
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
      width: "1003%",
      color: "#fff",
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  const register = async () => (
   window.location.assign("http://localhost:9000/auth/google")
  );

  return (
    <>
      <ButtonGroup
        // disableElevation
        variant="contained"
        color="primary"
        style={{
          marginBottom: mg ? "15px" : "25px",
        }}
      >
        <Button style={{ width: "50%", backgroundColor: "#1990ba" }}>
          {!mg ? "Register" : "Login"}
        </Button>
        <Button
          style={{ width: "50%", backgroundColor: "#abdbe3" }}
          onClick={(e) =>
            mg
              ? hadleSubmitDetails("register", e)
              : hadleSubmitDetails("login", e)
          }
        >
          {mg ? "Register" : "Login"}
        </Button>
      </ButtonGroup>
      <Divider variant="middle" />
      <Typography align="center" variant="subtitle2" color="inherit">
        ---or---
      </Typography>
      <Divider variant="middle" style={{ marginBottom: mg ? null : "25px" }} />
      <Fab
        variant="extended"
        size="medium"
        aria-label="add"
        style={{ width: "96%", backgroundColor: "#3b5998" }}
        className={classes.margin}
      >
        <FacebookIcon className={classes.extendedIcon} />
        login with facebook
      </Fab>

      <Fab
        variant="extended"
        size="medium"
        aria-label="add"
        style={{
          width: "96%",
          backgroundColor: "#db4a39",
        }}
        className={classes.margin}
        onClick={register}
      >
        <GTranslateIcon className={classes.extendedIcon} />
        login with google
      </Fab>
    </>
  );
}
