import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Input } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 0, 1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function DetailedAccordion({ saveGroupInfo, Groups }) {
  const classes = useStyles();
  const [groups, setGroups] = React.useState([]);
  const [type, setType] = React.useState();

  const handleClick = (name) => {
    const ext = groups.includes(name);
    if (!ext && groups.length < 5) setGroups([...groups, name]);
  };

  const deleteGroup = (name) => {
    const reduceGroup = arrayRemove(groups, name);
    setGroups([...reduceGroup]);
  };

  const arrayRemove = (arr, value) => {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  };

  const handelKeypress = (e) => {
    const ext = groups.includes(type);
    if (!ext && groups.length < 5) setGroups([...groups, type]);
    setType("");
  };

  const closeAll = () => {
    setType("");
    setGroups([]);
  };

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>
              You can join an existing group or create own group
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              Join an existing group
            </Typography>
          </div>
        </AccordionSummary>

        <AccordionDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
            {Groups.map((group, i) => (
              <Chip label={group} key={i} onClick={() => handleClick(group)} />
            ))}
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Input
              placeholder="Enter group name"
              onChange={(e) => setType(e.target.value)}
              value={type}
              onKeyPress={(e) => (e.key === "Enter" ? handelKeypress(e) : null)}
            />
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            {groups.map((group) => (
              <Chip label={group} onDelete={() => deleteGroup(group)} />
            ))}
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small" onClick={closeAll}>
            Cancel
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => saveGroupInfo(groups)}
          >
            Save
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
