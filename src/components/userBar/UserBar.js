import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

export default function UserBar({ currentUser, user, active, dic }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: "36ch",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
    colorme: {
      backgroundColor: "#DEE2E6",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#DEE2ff",
      },
    },
  }));

  console.log(typeof user);

  const classes = useStyles();

  return (
    <>
      {user ? (
        <List className={classes.root}>
          <ListItem
            className={classes.colorme}
            alignItems="flex-start"
            onClick={(e) =>
              typeof user === "string"
                ? currentUser(e, user, true)
                : currentUser(e, user, false)
            }
          >
            <ListItemAvatar>
              <Badge color="primary" invisible={!active} badgeContent=" ">
                <Avatar
                  alt={typeof user === "string" ? "G" : user.name}
                  src={`${typeof user === "string" ? null : user.image}`}
                />
              </Badge>
            </ListItemAvatar>

            <ListItemText
              primary={typeof user === "string" ? user : user.name}
              secondary={
                <React.Fragment>
                  {!dic ? (
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        typing...
                      </Typography>
                      recent message
                    </>
                  ) : (
                    " recent message"
                  )}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      ) : null}
    </>
  );
}
