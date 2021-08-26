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
import BASE_URL from "../../baseURL";
import { mainListItems, secondaryListItems } from "../listItems";
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
  const [amount, setAmount] = useState(0);
  const [recordType, setRecordType] = useState("");
  const [paymentMode, setPaymentMode] = useState("None");
  const [remarks, setRemarks] = useState("");

  const [info, setInfo] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  /* 
    Request will look like

    {
        buyer : {buyerid, buyerName, rating, address},
        shop : {shopID, shopName},
        merchant : {merchantID,merchantName},
        status : string
        amount,
        recordType:
        PaymentMode : 
        remarks:
        balance shopwise
    }
    */

  const initShopList = async () => {
    const res = await fetch(BASE_URL + "shop");
    const data = await res.json();
    console.log(data);
    setInfo(data.shops);
  };
  useEffect(() => {
    initShopList();
  }, []);

  const sendRequest = (e) => {
    e.preventDefault();
    const request = {
      buyerID: JSON.parse(localStorage.getItem("userId")),
      shopID,
      amount,
      recordType,
      paymentMode: paymentMode || "None",
      remarks,
    };
    //console.log(`request`, request);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    };

    fetch(BASE_URL + "request/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        alert("Request done..wait for merchant to accept");
        //redirecting to dashboard page
        // window.location.href = "/";
      })
      .catch((err) => {
        alert("Failed to request");
        console.log(`err`, err);
      });
  };
  const selectShop = (e) => {
    //console.log(e.target.value);
    setShopID(e.target.value);
    // const {shopName , merchantName, merchantID} = info.find((el)=> shopID === el._id);
    // setShopName(shopName);
    // setMerchantID(merchantID);
    // setMerchantName(merchantName);
  };

  const onAmountChange = (e) => {
    // console.log(e.target.value);
    setAmount(e.target.value);
  };
  const onRemarksChange = (e) => {
    // console.log(e.target.value);
    setRemarks(e.target.value);
  };

  const onPaymentModeChange = (e) => {
    // console.log(e.target.value);
    setPaymentMode(e.target.value);
  };

  const onRecordTypeChange = (e) => {
    //console.log(e.target.value);
    setRecordType(e.target.value);
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
              <FormControl variant="outlined" className={classes.formControl} 
                style={{textAlign:"left"}}
              >
              <InputLabel id="demo-simple-select-outlined-label">
                  Select Shop
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={selectShop}
                  label="Select Shop"
                >
                 
                  <MenuItem value="none">
                    <em>None</em>
                  </MenuItem>
                  {info.map((shop) => {
                    return (
                      <MenuItem key={shop._id} value={shop._id}>
                        {shop.shopName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              { shopID !== "none" && <>
              <FormControl 
                style={{ display: "block", margin: "10px 0 10px 0",  }}
              >
                <TextField
                  id="outlined-basic"
                  label="Amount"
                  variant="outlined"
                  onChange={onAmountChange}
                  required
                />
              </FormControl>
              <FormControl component="fieldset">
                <FormLabel
                  component="legend"
                  style={{
                    textAlign: "left",
                    width: "220px",
                    margin: "0 5px 0 5px",
                  }}
                >
                  Record Type
                </FormLabel>
                <RadioGroup
                  aria-label="record"
                  name="recordtypes"
                  style={{ display: "block", width: "220px" }}
                  onChange={onRecordTypeChange}
                >
                  <FormControlLabel
                    value="DEBIT"
                    control={<Radio />}
                    label="Debit"
                  />
                  <FormControlLabel
                    value="CREDIT"
                    control={<Radio />}
                    label="Credit"
                  />
                </RadioGroup>
              </FormControl>

              <FormControl
                style={{ display: "block", margin: "10px 0 10px 0" }}
              >
                <TextField
                  id="outlined-basic"
                  label="PaymentMode"
                  variant="outlined"
                  onChange={onPaymentModeChange}
                />
              </FormControl>
              <FormControl style={{ display: "block" }}>
                <TextField
                  id="outlined-basic"
                  label="Remarks"
                  variant="outlined"
                  onChange={onRemarksChange}
                />
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Send Request
              </Button>
              </>
              }
            </form>
          </div>
        </Container>
      </main>
    </div>
  );
}