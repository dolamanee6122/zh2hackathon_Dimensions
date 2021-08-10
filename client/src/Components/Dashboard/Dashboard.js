import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import StatCards from "./StatCards";
import Requests from "./Requests";
import RecentTransactions from "./RecentTransactions";
import { mainListItems, secondaryListItems } from "../listItems";
import BASE_URL from "../../baseURL";
import axios from "axios";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    // content which is class of main needs to be flex and column direction
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 215,
    borderLeft: "4px solid #0077dd",
  },
  requests: {
    height: 350,
    borderTop: "4px solid #0077dd",
  },
  transactions: {
    height: 530,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const requests = clsx(classes.paper, classes.requests);

  const [merchantInfo, setMerchantInfo] = useState();
  const [readyForRender, setReadyForRender] = useState(false);
  const id = "61116b71f91ae38348c87a2d";
  const apiURL = BASE_URL + "merchants/" + id;

  async function fetchMerchant() {
    console.log("I am fetch merchant", apiURL);
    // const response = await fetch(apiURL);
    // const data = await response.json();
    // setMerchantInfo(data.merchant);
    // console.log(`merchantInfo`, merchantInfo);
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        setMerchantInfo(data.merchant);
        setReadyForRender(true);
      })
      .catch((err) => console.log(`err`, err));
  }
  useEffect(() => {
    console.log("I am use effect");
    fetchMerchant();
  }, []);

  if (readyForRender) {
    return (
      <div className={classes.root}>
        <CssBaseline />
        {console.log("mmmmmmmmmmmmmm", merchantInfo)}
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Daily */}
              <Grid item xs={12} md={6} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <StatCards
                    title={"Today"}
                    balance={merchantInfo.user.balance}
                    lastUpdated={"53 mins ago"}
                  />{" "}
                </Paper>
              </Grid>
              {/* weekly */}
              <Grid item xs={12} md={6} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <StatCards
                    style={{ color: "yellow" }}
                    title={"This Week"}
                    balance={merchantInfo.user.balance}
                    lastUpdated={"7-15 August 2021"}
                  />
                </Paper>
              </Grid>
              {/* Monthly */}
              <Grid item xs={12} md={6} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <StatCards
                    title={"This Month"}
                    balance={merchantInfo.user.balance}
                    lastUpdated={"21 August 2021"}
                  />
                </Paper>
              </Grid>
              {/*Quarter*/}
              <Grid item xs={12} md={6} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <StatCards
                    title={"All Tieme"}
                    balance={merchantInfo.user.balance}
                    lastUpdated="July-Sept"
                  />
                </Paper>
              </Grid>
              {/* Transaction */}
              <Grid item xs={12} md={10} lg={7}>
                <Paper className={requests}>
                  <RecentTransactions />
                </Paper>
              </Grid>
              {/*Request*/}
              <Grid item xs={12} md={10} lg={5}>
                <Paper className={requests}>
                  <Requests />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  } else {
    return null;
  }
}
