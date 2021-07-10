import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
// import moment from 'moment';

const Message = ({ me, admin, barState, message, currentUser, image }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: barState ? "70%" : "100%",
      maxWidth: barState ? "40ch" : "60ch",
      backgroundColor: "#FFCBF2",
      left: 10,
    },
    rootLeft: {
      width: barState ? "70%" : "100%",
      maxWidth: barState ? "40ch" : "60ch",
      backgroundColor: "#D0D1FF",
      left: barState ? 230 : 360,
      marginButtom: 30,
    },
    inline: {
      display: "inline",
    },
    roots: {
      textAlign: "flex-start",
      maxWidth: barState ? 260 : null,
      position: "reletive",
    },
    root1: {
      paddingLeft: 10,
      marginRight: -10,
      marginTop: -40,
      position: "absolute",
      top: 60,
      right: 10,
    },
    admin: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      "& > *": {
        marginBottom: theme.spacing(1),
      },
    },
  }));

  // console.log(currentUser, "         ;;;;;;;;;;;;;;;;;;;;;;;");
  // console.log(message, "                    cccccccccccccccccccccc");

  const classes = useStyles();
  return (
    <div style={{ width: "100%" }}>
      {Object.keys(currentUser).length !== 0 ? (
        !admin ? (
          <div style={{ marginBottom: "8px", marginTop: "8px" }}>
            {!me ? (
              currentUser._id === message.senderId ? (
                <ListItem
                  classes={{
                    root: classes.root,
                  }}
                  alignItems="flex-start"
                  divider={true}
                >
                  <ListItemAvatar alignItems="flex-end">
                    <Avatar alt="Remy Sharp" src={currentUser.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="11 : 39am"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="subtitle2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          : &nbsp;&nbsp;&nbsp;
                        </Typography>

                        {message !== undefined ? message.message : ""}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ) : null
            ) : (
              <ListItem
                classes={{
                  root: classes.rootLeft, // class name, e.g. `classes-nesting-root-x`
                }}
                divider={true}
              >
                <ListItemText
                  className={classes.roots}
                  primary="11 : 39am"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        11 : 39am : &nbsp;&nbsp;&nbsp;
                      </Typography>

                      {message !== undefined ? message.message : ""}
                    </React.Fragment>
                  }
                />
                <ListItemAvatar className={classes.root1}>
                  <Avatar alt="Remy Sharp" src={image} />
                </ListItemAvatar>
              </ListItem>
            )}
          </div>
        ) : (
          <div className={classes.admin}>
            <Chip
              avatar={<Avatar>A</Avatar>}
              label={message !== undefined ? message.payload : ""}
            />
          </div>
        )
      ) : (
        <div className={classes.admin} style={{ marginTop: "30%" }}>
          <Chip
            avatar={<Avatar>A</Avatar>}
            label="Start by selecting someone and typing something"
          />
        </div>
      )}
    </div>
  );
};

export default Message;
