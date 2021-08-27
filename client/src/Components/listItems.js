import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CodeIcon from '@material-ui/icons/Code';
import { Badge, Chip, ListItemSecondaryAction } from "@material-ui/core";
import { Link } from "react-router-dom";


const handleClick = () => {
  window.open("https://github.com/dolamanee6122/Dimensions");
};

export const mainListItems = (
  <div>
    <Link to="/">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link to="/requests">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Requests" />
        {/* <ListItemSecondaryAction>
        <Chip label="3" size="small" color="primary" />
      </ListItemSecondaryAction> */}
      </ListItem>
    </Link>
    <Link to="/transactions">
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Transactions" />
        {/* <ListItemSecondaryAction>
        <Chip label="4" size="small" />
      </ListItemSecondaryAction> */}
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Highlights</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <Link to="/profile">
        <ListItemText primary="Your Profile" />
      </Link>

    </ListItem>
    <ListItem button>
      <ListItemIcon onClick={handleClick}>
        <CodeIcon />
      </ListItemIcon>
      <ListItemText onClick={handleClick} primary="Github Repo" />
    </ListItem>
  </div>
);
