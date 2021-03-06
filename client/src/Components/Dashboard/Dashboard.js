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
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "../listItems";
import BASE_URL from "../../baseURL";
import DataElements from "./DataElements";
import {
  Button,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
} from "@material-ui/core";

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

export default function Dashboard({handleLogout}) {
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [merchantInfo, setMerchantInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [shops, setShops] = useState();
  const [request, setRequest] = useState();
  const [selectedShop, setSelectedShop] = useState("all");
  const [stats, setStats] = useState();
  const [trxns,setTrxns] =useState();

  // const id = "61136f34480a693fb4d49453";

  // const idString = sessionStorage.getItem('userId');
  const idString = localStorage.getItem('userId');
  const id = JSON.parse(idString);
  console.log(`id in Dash---------------------------------------------------------------------`, id)
  const apiURL = BASE_URL + "merchants/" + id;

  console.log(apiURL);
  async function fetchMerchant() {
    console.log("here");
    const response = await fetch(`${apiURL}`);
    const info = await response.json();
    setMerchantInfo(info.merchant);
    // console.log(`merchnatInfo`, merchantInfo)
    setShops(info.merchant.shopList);
    // setStats(info.merchant.user.balance);
    await fetchStats(id, "merchant");
    await fetchTransactions(id);
    await fetchRequests(id);
    setLoading(false);
  }
  async function fetchRequests(id) {
    console.log("@request");
    const URL = BASE_URL + "request/" + id + "/?limit=3";
    const response = await fetch(`${URL}`);
    const info = await response.json();
    console.log("Requests------------------->", info);
    setRequest(info.requests);
    setLoading(false);
  }
  
  async function fetchTransactions(id) {
    console.log("@trn");
    const URL = BASE_URL + "transaction/" + id + "/?limit=3";
    const response = await fetch(`${URL}`);
    const info = await response.json();
    console.log("Trxn------------------->", info);
    // setRequest(info.reque);
    setTrxns(info.transactions);
  }

  async function fetchStats(id, type) {
    console.log("from fetchStats");
    const URL =
      BASE_URL + "transaction/balanceanalytics/" + id + "/?type=" + type;
    console.log(`URL`, URL);
    const response = await fetch(`${URL}`);
    const info = await response.json();
    console.log("stats------------------->", info);
    setStats(info.balanceAnalytics);
  }
  async function fetchShopDetails(id) {
    console.log("@shopDetails");
    const URL = BASE_URL + "shop/" + id;
    console.log(`URL`, URL);
    const response = await fetch(`${URL}`);
    const info = await response.json();
    console.log("shop------------------->", info);
    setStats(info.shop.balance);
    await fetchStats(id, "shop");
    await fetchRequests(id);
    setLoading(false);
    //setMerchantInfo(info.merchant);
    //setShops(info.merchant.shopList)
  }
  useEffect(async () => {
    console.log("useEffece t Caked");
    await fetchMerchant();
    //await fetchRequests();
  }, []);

  const handleShopChange = (e) => {
    e.preventDefault();
    setSelectedShop(e.target.value);
    console.log(selectedShop);
    if (e.target.value === "all") {
      fetchStats(id, "merchant");
    } else {
      setLoading(true);
      // const ShopID=selectedShop;
      fetchShopDetails(e.target.value);
    }
  };

  return (
    <div>
      {/* {console.log(`merchantInfo`, merchantInfo)}
      {console.log(`shopList`, shops)} */}
      {loading && <LinearProgress />}
      {!loading && (
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
              <Button  variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              ),
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
              <div style={{ display: "flex" }}>
                <h2 style={{ display: "flex-start" }}>
                  Hi, {merchantInfo.user.firstName}
                </h2>
                <div style={{ marginLeft: "auto" }}>
                  <InputLabel id="shop-dropdown">Shops</InputLabel>
                  <Select
                    labelId="shop-dropdown"
                    value={selectedShop}
                    onChange={handleShopChange}
                  >
                    <MenuItem value="all">
                      <em>All Shops</em>
                    </MenuItem>
                    {shops.map((e) => {
                      return (
                        <MenuItem key={e.shopID} value={e.shopID}>
                          {e.shopName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>
                    Select to get Shop-wise analysis
                  </FormHelperText>
                </div>
              </div>
              <DataElements
                stats={stats}
                request={request}
                trxns={trxns}
                id={id}
                accountType={"merchant"}
              />
            </Container>
          </main>
        </div>
      )}
    </div>
  );
}
