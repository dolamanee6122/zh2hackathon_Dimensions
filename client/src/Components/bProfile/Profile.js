import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems, secondaryListItems } from "../listItems";
import BASE_URL from '../../baseURL';
import { LinearProgress, Select } from "@material-ui/core";
import './Profile.css';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import ContactMailIcon from '@material-ui/icons/ContactMail';
// import { useState } from "react";
const useRowStyles = makeStyles({
    root: {
        "& > *": {
            borderBottom: "unset"
        }
    }
});

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1
    },
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
        overflow: "auto"
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

const getColor = (amt) => {
    if (amt === 0)
        return "black";
    else if (amt > 0)
        return "green";
    return "red";
}


const fetchName = async () => {
    try {
        const id = JSON.parse(localStorage.getItem("userId"));
        const accountType = JSON.parse(localStorage.getItem("accountType"));
        accountType.toLowerCase();
        const res = await fetch(BASE_URL + accountType + "s/" + id);
        const data = await res.json();
        console.log("hello", data.buyer.balanceShopWise);
        return ({
            name: data.firstName + " " + data.lastName,
            verify: data.vectors[0].verified == true ? "YES" : "NO",
            dob: data.dob,
            balance: data.buyer.user.balance.balance,
            color: getColor(data.buyer.user.balance.balance),
            id: data.id,
            shop: data.buyer.balanceShopWise
        })
    }
    catch {
        console.log("error in name");
        window.location.href = "/";
    }
}

export default function Profile(props) {
    const [value, setValue] = React.useState(2);
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const accountType = JSON.parse(localStorage.getItem("accountType"));
    const [loading, setLoading] = useState(false);
    const [pro, setPro] = useState({
        name: "user",
        gender: "",
        dob: "01/01/2010",
        verify: "No",
        balance: "0.00",
        color: "",
        id: "****",
        shop: []
    })

    useEffect(async () => {
        const ndata = await fetchName();
        setPro(ndata);
        // console.log(ndata.shop);
    }, [])

    return (
        <div>
            {loading && <LinearProgress />}
            {!loading && <div className={classes.root}>
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
                            Profile
                        </Typography>
                        <EditIcon style={{ marginRight: "3px" }} />
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
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
                <div className="proContainer" >
                    <div className="div1">
                        <div style={{ display: "flex" }}>
                            <div className="imgCard">
                                <img src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png" alt="Profile Picture" />
                            </div>
                        </div>
                        <div className="rating">
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography component="legend" align="left" > <Rating style={{ color: "#3f51b5" }} name="read-only" value={4} readOnly /></Typography>

                            </Box>
                        </div>
                        <div style={{ marginTop: "0px" }}>
                            <div className="row">
                                <h4>Full Name</h4>
                                <h4 style={{ marginRight: "10px" }}>{pro.name}</h4>
                            </div>
                            <hr />
                            <div className="row">
                                <h4>Date of Birth</h4>
                                <h4 style={{ marginRight: "10px" }}> {pro.dob}</h4>
                            </div>
                            <hr />
                            <div className="row">
                                <h4>Gender</h4>
                                <h4 style={{ marginRight: "10px" }}> Unknown</h4>
                            </div>
                            <hr />
                            <div className="row">
                                <h4>Total Balance</h4>
                                <h4 style={{ marginRight: "10px", color: pro.color }}>{pro.balance}</h4>
                            </div>
                            <hr />
                            <div className="row">
                                <h4>verified User</h4>
                                <h4 style={{ marginRight: "10px" }}>{pro.verify}</h4>
                            </div>
                            <hr />
                            <div className="row">
                                <h4>ID:</h4>
                                <h4 style={{ marginRight: "10px" }}>{pro.id}</h4>
                            </div>
                        </div>
                        <div className="btn">
                            <Link to="/about"><Button variant="contained" color="primary">
                                See your transactions
                            </Button></Link>



                        </div>

                    </div>
                    <div className="div2">

                        <div className="row">
                            <h4 style={{ fontWeight: "700" }} >Address</h4>
                        </div>
                        <div className="row">
                            <Typography align="left" component="legend" >
                                Paliya pratap shah,Near Bank of Baroda ,Mungeshpur 224363,Bangalore
                                India
                            </Typography>
                        </div>
                        <div className="row">
                            <h4 style={{ fontWeight: "700" }}>{accountType === "MERCHANT" ? "List of Shops" : "List of Merchants Connected"}</h4>
                        </div>
                        <div>
                            {pro.shop.map((nd) => (
                                <div className="row">
                                    <h3>{nd.shopName}</h3>
                                    <h3 style={{ marginRight: "10px", color: getColor(nd.balance.balance) }}>{nd.balance.balance}</h3>
                                </div>
                            ))}
                        </div>
                        <div className="row1">
                            <a href=""> <FacebookIcon style={{ fontSize: "4rem", color: "#3f51b5" }} /></a>
                            <a href=""> <LocalPhoneIcon style={{ fontSize: "4rem", color: "#3f51b5" }} /> </a>
                            <a href="">  <ContactMailIcon style={{ fontSize: "4rem", color: "#3f51b5" }} /></a>
                        </div>
                    </div>
                </div>
            </div>}
        </div >
    );
}