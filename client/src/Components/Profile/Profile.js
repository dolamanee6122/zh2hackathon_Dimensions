import React from "react";
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
import { mainListItems, secondaryListItems } from "./../listItems";
import BASE_URL from '../../baseURL';
import { LinearProgress, Select } from "@material-ui/core";
import './Profile.css';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
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



const fetchName = async () => {
    try {
        const id = JSON.parse(sessionStorage.getItem("userId"));
        const accountType = JSON.parse(sessionStorage.getItem("accountType"));
        const res = await fetch(BASE_URL + accountType + "s/" + id);
        const data = await res.json();
        // console.log(data.merchant.user);
        if (accountType === "MERCHANT")
            return data.merchant.user.firstName + " " + data.merchant.user.lastName;
        return data.buyer.user.firstName + " " + data.buyer.user.lastName;
    }
    catch {
        //console.log("error in name");
        window.location.href = "/";
    }
}

export default function Transactions(props) {
    const [value, setValue] = React.useState(2);
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [loading, setLoading] = useState(false);

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
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU" alt="" />
                            </div>
                        </div>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend" align="left" > <Rating style={{ color: "#3f51b5" }} name="read-only" value={value} readOnly /></Typography>

                        </Box>
                        <div>
                            <h4>Gauravi</h4>
                            <h4>Dob:-12/09/2021</h4>
                            <h4>ID:2187454uydgawygayur8228</h4>
                        </div>
                    </div>

                    <div className="div2">
                        <ul>
                            <li>
                                <Typography align="left" variant="p"  >
                                    Address
                                </Typography>
                                <Typography align="left" component="legend" >
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quas nostrum blanditiis, minus illo debitis nulla nihil rerum dolorem nemo sequi molestias fugit ad ab. Nemo illum optio placeat sapiente?
                                </Typography>
                            </li>
                            <li>
                                <Typography align="left" variant="p"  >
                                    Address
                                </Typography>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>}

        </div >
    );
}