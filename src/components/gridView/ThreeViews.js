import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export default function ThreeViews({ views }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 15,
    },
    paper0: {
      width: 304,
      maxHeight: 512,
      overflow: "auto",
      minHeight: 512,
    },
    paper1: {
      width: true ? 604 : 708,
      minHeight: 400,
      maxHeight: 465,
      overflowY: "auto",
      backgroundSize: "cover",
      zIndex: 80,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={0}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={3}>
          {views.map((value, i) => (
            <Grid key={i} item>
              <Paper
                className={i === 1 ? classes.paper1 : classes.paper0}
                elevation={3}
                variant="outlined"
                square
              >
                {value}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
