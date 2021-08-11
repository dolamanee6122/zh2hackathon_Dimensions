import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const useRowStyles = makeStyles({
    root: {
        "& > *": {
            borderBottom: "unset"
        }
    }
});
const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1
    }
}));

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

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow style={{ height: 10 }} className={classes.root}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.date}
                </TableCell>
                <TableCell align="center">{row.sender}</TableCell>
                <TableCell align="center">{row.narration}</TableCell>
                <TableCell align="center">{row.mop}</TableCell>
                <TableCell align="center">{row.debit}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Description
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="center">Name of the Item</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.description.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="center">
                                                {historyRow.nameOfItem}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <Box m={1}>
                                        <Button variant="outlined" color="primary">
                                            Print Bill
                                        </Button>
                                    </Box>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
const rows = [
    createData(
        "15-06-2001",
        "Gaurav",
        "BY TRANSFER UPI/CR/121778581431/SHIV SIN/PUNB/shivsinghm/UPI",
        "UPI",
        4.0,
        3.99
    ),
    createData(
        "15-06-2001",
        "Gaurav",
        "BY TRANSFER UPI/CR/121778581431/SHIV SIN/PUNB/shivsinghm/UPI",
        "UPI",
        4.0,
        3.99
    ),
    createData(
        "15-06-2001",
        "Gaurav",
        "BY TRANSFER UPI/CR/121778581431/SHIV SIN/PUNB/shivsinghm/UPI",
        "UPI",
        4.0,
        3.99
    ),
    createData(
        "15-06-2001",
        "Gaurav",
        "BY TRANSFER UPI/CR/121778581431/SHIV SIN/PUNB/shivsinghm/UPI",
        "UPI",
        4.0,
        3.99
    ),
    createData(
        "15-06-2001",
        "Gaurav",
        "BY TRANSFER UPI/CR/121778581431/SHIV SIN/PUNB/shivsinghm/UPI",
        "UPI",
        4.0,
        3.99
    ),
    createData(
        "15-06-2001",
        "Gaurav",
        "BY TRANSFER UPI/CR/121778581431/SHIV SIN/PUNB/shivsinghm/UPI",
        "UPI",
        4.0,
        3.99
    ),
    createData(
        "15-06-2001",
        "Gaurav",
        "BY TRANSFER UPI/CR/121778581431/SHIV SIN/PUNB/shivsinghm/UPI",
        "UPI",
        4.0,
        3.99
    ),
    createData(
        "15-06-2001",
        "Gaurav",
        "BY TRANSFER UPI/CR/121778581431/SHIV SIN/PUNB/shivsinghm/UPI",
        "UPI",
        4.0,
        3.99
    ),
    createData(
        "15-06-2001",
        "Gaurav",
        "BY TRANSFER UPI/CR/121778581431/SHIV SIN/PUNB/shivsinghm/UPI",
        "UPI",
        4.0,
        3.99
    )
];

export default function CollapsibleTable() {
    const classes = useStyles();
    return (
        <>
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Transactions
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <Box m={9}>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Date(Value Date)</TableCell>
                                <TableCell align="center">Sender</TableCell>
                                <TableCell align="center">Narration</TableCell>
                                <TableCell align="center">Mode of Payment</TableCell>
                                <TableCell align="center">Debit/Credit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <Row key={row.name} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}
