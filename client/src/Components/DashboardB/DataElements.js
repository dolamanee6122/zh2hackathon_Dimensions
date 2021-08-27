import { Fab, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import clsx from "clsx";
import AddIcon from "@material-ui/icons/Add";
import RecentTransactions from './RecentTransactions'
import Requests from './Requests'
import StatCards from './StatCards'
import { Link } from 'react-router-dom';

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
  
const DataElements = ({stats,request,id,accountType,trxns}) => {
    
    console.log('dstat',stats)
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const requests = clsx(classes.paper, classes.requests);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const d= new Date();
      const day =d.getDate();
      const month = monthNames[d.getMonth()];
  
      var first = d.getDate() - d.getDay(); // First day is the day of the month - the day of the week
      var last = first + 6; // last day is the first day + 6

      var firstday = new Date(d.setDate(first)).getDate()+ " "+monthNames[new Date(d.setDate(first)).getMonth()];
      var lastday = new Date(d.setDate(last)).getDate()+ " "+monthNames[new Date(d.setDate(last)).getMonth()];
  
    return (
        <div>
            <Grid container spacing={3}>
            {/* Daily */}
            <Grid item xs={12} md={6} lg={3}>
              <Paper className={fixedHeightPaper}>
                <StatCards
                  title={"Today"}
                  balance={stats.today}
                  lastUpdated={day+" "+month}
                />
              </Paper>
            </Grid>
            {/* weekly */}
            <Grid item xs={12} md={6} lg={3}>
              <Paper className={fixedHeightPaper}>
                <StatCards
                  title={"This Week"}
                  balance={stats.week}
                  lastUpdated={firstday+" "+lastday}
                />
              </Paper>
            </Grid>
            {/* Monthly */}
            <Grid item xs={12} md={6} lg={3}>
              <Paper className={fixedHeightPaper}>
                <StatCards
                  title={"This Month"}
                  balance={stats.month}
                  lastUpdated={month}
                />
              </Paper>
            </Grid>
            {/*Quarter*/}
            <Grid item xs={12} md={6} lg={3}>
              <Paper className={fixedHeightPaper}>
                <StatCards
                  title={"All Time"}
                  balance={stats.allTime}
                  lastUpdated=""
                />
              </Paper>
            </Grid>
            {/* Transaction */}
            <Grid item xs={12} md={10} lg={7}>
              <Paper className={requests}>
                <RecentTransactions trxns={trxns} />
              </Paper>
            </Grid>
            {/*Request*/}
            <Grid item xs={12} md={10} lg={5}>
              <Paper className={requests}>
                <Requests  request={request} id={id} accountType={accountType} />
              </Paper>
            </Grid>
          </Grid>
        <Link to="/createrequest">
        <Fab color="primary" aria-label="add" style={{position:"absolute", bottom:"24px", right:"48px"}}>
            <AddIcon />
        </Fab>
        </Link>
        
        </div>
    )
}

export default DataElements
