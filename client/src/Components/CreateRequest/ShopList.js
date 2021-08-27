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
import {Link} from "react-router-dom";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import BASE_URL from "../../baseURL";
import { mainListItems, secondaryListItems } from "../listItems";
import Shop from "./Shop";
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
    minWidth: 245,
  },
  formControl: {
    minWidth: 245,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CreateRequest(params) {
  //const BASE_URL = "http://localhost:5000";
  const [shopID, setShopID] = useState("none");
  const [shopName, setShopName] = useState("dummy");
  const [selected,setSelected] = useState(false);
  const [info, setInfo] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const initShopList = async () => {
    const res = await fetch(BASE_URL + "shop");
    const data = await res.json();
    console.log(data);
    setInfo(data.shops);
  };

  useEffect(() => {
    initShopList();
  }, []);
  const selectedShop = (e)=>{
    localStorage.setItem("shopRequestID",JSON.stringify(shopID));
    localStorage.setItem("shopRequestName",JSON.stringify(shopName));
    //window.location.href = '/fillrequest';
    console.log("Hello1");
  }

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
            Select Shop
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

        {/* <Shop shopID="61136f5a480a693fb4d49456"/> */}
          <h2> Shop List</h2>
          {info.map((shop)=>{
              
              //make the shop here 
              console.log(shop);
              return (
              <Link to={{ pathname: '/fillrequest', data : { id : shop._id , name: shop.shopName } }}>
              {/* <Link to='/fillrequest'> */}
              <Shop shopDetails={JSON.stringify(shop)} onClick={selectedShop} />
              </Link>
              )
          })}
        </Container>
      </main>
    </div>
  );
}