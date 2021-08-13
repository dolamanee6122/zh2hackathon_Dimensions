import React from "react";
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Button,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  makeStyles,
  List,
  Divider,
  IconButton,
  Drawer,
  Badge,
  Typography,
  Toolbar,
  AppBar,
  CssBaseline,
  Container,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import BASE_URL from "../baseURL";
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
  submit: {
    margin: theme.spacing(3, 0, 2),
    minWidth: 227,
  },
  formControl: {
    minWidth: 227,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddShop(params) {
  //const BASE_URL = "http://localhost:5000";
  const [shopName, setShopName] = useState("dummy");
  const [line1, setLine1] = useState("Address line 1");
  const [line2, setLine2] = useState("Address line 2");
  const [city, setCity] = useState("City");
  const [state, setState] = useState("State");
  const [pinCode, setPinCode] = useState(0);

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const sendRequest = (e) => {
    e.preventDefault();
    //{ shopName, merchantID, address, rating }
    const request = {
      merchantID: localStorage.getItem("id") || "61136f34480a693fb4d49453",
      shopName,
      address: {
        line1,
        line2,
        city,
        state,
        pinCode,
      },
      rating: 100,
    };
    //console.log(`request`, request);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    };
    fetch(BASE_URL + "shop/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        alert("Shop Added");
        //redirecting to dashboard page
        window.location.href = "/";
      })
      .catch((err) => {
        alert("Failed to add Shop");
        console.log(`err`, err);
      });
  };
  const onShopNameChange = (e) => {
    setShopName(e.target.value);
  };
  const onLine1Change = (e) => {
    setLine1(e.target.value);
  };
  const onLine2Change = (e) => {
    setLine2(e.target.value);
  };
  const onCityChange = (e) => {
    setCity(e.target.value);
  };
  const onStateChange = (e) => {
    setState(e.target.value);
  };
  const onPinCodeChange = (e) => {
    setPinCode(e.target.value);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
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
            color="inherst"
            noWrap
            className={classes.title}
          >
            Create Request
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
      <main className={classes.content} stystyle>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <div className="container">
            <form onSubmit={sendRequest}>
              <FormControl
                style={{ display: "block", margin: "10px 0 10px 0" }}
              >
                <TextField
                  id="outlined-basic"
                  label="Shop Name"
                  variant="outlined"
                  onChange={onShopNameChange}
                  required
                />
              </FormControl>
              <FormControl component="fieldset">
                <label
                  component="legend"
                  style={{
                    textAlign: "left",
                    width: "220px",
                    margin: "0 5px 0 5px",
                  }}
                >
                  Address
                </label>
              </FormControl>

              <FormControl
                style={{ display: "block", margin: "10px 0 10px 0" }}
              >
                <TextField
                  id="outlined-basic"
                  label="Address Line1"
                  variant="outlined"
                  onChange={onLine1Change}
                  required
                />
              </FormControl>
              <FormControl
                style={{ display: "block", margin: "10px 0 10px 0" }}
              >
                <TextField
                  id="outlined-basic"
                  label="Address Line2"
                  variant="outlined"
                  onChange={onLine2Change}
                />
              </FormControl>
              <FormControl
                style={{ display: "block", margin: "10px 0 10px 0" }}
              >
                <TextField
                  id="outlined-basic"
                  label="City"
                  variant="outlined"
                  onChange={onCityChange}
                  required
                />
              </FormControl>
              <FormControl
                style={{ display: "block", margin: "10px 0 10px 0" }}
              >
                <TextField
                  id="outlined-basic"
                  label="State"
                  variant="outlined"
                  onChange={onStateChange}
                  required
                />
              </FormControl>
              <FormControl
                style={{ display: "block", margin: "10px 0 10px 0" }}
              >
                <TextField
                  id="outlined-basic"
                  label="Pin Code"
                  variant="outlined"
                  onChange={onPinCodeChange}
                  required
                />
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add Shop
              </Button>
            </form>
          </div>
        </Container>
      </main>
    </div>
  );
}
