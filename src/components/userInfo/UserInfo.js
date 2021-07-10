import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import UserBar from "../userBar/UserBar";

import { instance } from "../../apis";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    zIndex: 2,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function UserInfo({
  toggleRightSideBar,
  currentUser,
  id,
  groupName,
  groupMembers,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const blockOrUnblock = async () => {
    await instance.put(`/user/block/${id}`, { blocklist: currentUser.userId });
  };

  console.log(groupMembers);
  console.log(groupName);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            alt={
              groupName
                ? groupName
                : currentUser !== undefined
                ? currentUser.name
                : "O"
            }
            src={`${currentUser !== undefined ? currentUser.image : null}`}
          />
        }
        action={
          <IconButton
            aria-label="settings"
            onClick={(e) => toggleRightSideBar(e)}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        }
        title={
          groupName
            ? groupName
            : currentUser.name === undefined
            ? "Select user to chat with"
            : currentUser.name
        }
        subheader="September 14, 2016"
      />
      {groupName ? null : (
        <>
          <CardMedia
            className={classes.media}
            image={`${currentUser !== undefined ? currentUser.image : null}`}
            title="Paella dish"
          />
        </>
      )}

      <CardActions disableSpacing>
        <IconButton onClick={blockOrUnblock} aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{groupName? "Members" : "About"}</Typography>
          {groupName ? (
            groupMembers.map((member) => (
              <Typography paragraph><UserBar user={member} dic={true} active={member.active} /></Typography>
            ))
          ) : (
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}
