import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Transaction from './Transaction'
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems, secondaryListItems } from "../listItems";
import BASE_URL from '../../baseURL';
import { LinearProgress, Select } from "@material-ui/core";

const useRowStyles = makeStyles({
    root: {
        "& > *": {
            borderBottom: "unset"
        }
    }
});

function createData(date, sender, narration, mop, debit, credit) {
    return {
        date,
        sender,
        narration,
        mop,
        debit,
        credit,
        description: [
            { date: "2020-01-05", customerId: "11091700", nameOfItem: "Tatti" },
            { date: "2020-01-02", customerId: "29846111", nameOfItem: "Cow dung" }
        ]
    };
}


const rows = [
    createData(
        "15-06-2001",
        "Gaurav",
        "BY TRANSFER UPI/CR/121778581431/SHIV SIN/PUNB/shivsinghm/UPI",
        "UPI",
        4.0,
        3.99
    )
];



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

export default function Transactions(props) {
    const classes = useStyles();
    const id = "61136f34480a693fb4d49453";
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    useEffect(async () => {
        const URL = BASE_URL + "transaction/" + id;
        const res = await fetch(URL);
        const data = await res.json();
        console.log(data.transactions);
        console.log("hello");
        setRows(data.transactions);
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
                            Transactions
                        </Typography>
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
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Box m={9}>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow style={{ backgroundColor: "#3f51b5" }}>
                                        <TableCell />
                                        <TableCell style={{ fontWeight: "700", color: "white" }}>Date(Value Date)</TableCell>
                                        <TableCell style={{ fontWeight: "700", color: "white" }} align="center">Buyer Id</TableCell>
                                        <TableCell style={{ fontWeight: "700", color: "white" }} align="center">Shop Id</TableCell>
                                        <TableCell style={{ fontWeight: "700", color: "white" }} align="center">Mode of Payment</TableCell>
                                        <TableCell style={{ fontWeight: "700", color: "white" }} align="center">Debit/Credit</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {rows.map((row) => (
                                        <Transaction key={row.name} row={row} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </main>

            </div>}

        </div >
    );
}
