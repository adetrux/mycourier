import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    height: "100%",
    padding: 0,
    width: "auto",
    backgroundColor: "#eee"
  },
  listItem: {
    "&:hover": {
      backgroundColor: "#fff"
    }
  }
});

export function AppDrawer() {
  const classes = useStyles();
  return (
    <Drawer open={true}>
      <List className={classes.list}>
        <ListItem
          component={Link}
          to="/deliverables"
          className={classes.listItem}
        >
          <ListItemText primary="Deliverables" />
        </ListItem>
        <ListItem component={Link} to="/tracks" className={classes.listItem}>
          <ListItemText primary="Tracks" />
        </ListItem>
      </List>
    </Drawer>
  );
}
