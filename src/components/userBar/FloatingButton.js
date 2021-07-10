import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Modal from "../modal/modal";

export default function FloatingActionButtons({ saveGroupInfo, Groups }) {
  const [open, setOpen] = React.useState(false);
  const useStyles = makeStyles((theme) => ({
    root: {
      position: "absolute",
      top: "85%",
      left: "21%",
      zIndex: 999,
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Fab
        size="small"
        color="primary"
        aria-label="add"
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        close={closeModal}
        saveGroupInfo={saveGroupInfo}
        Groups={Groups}
      />
    </div>
  );
}
