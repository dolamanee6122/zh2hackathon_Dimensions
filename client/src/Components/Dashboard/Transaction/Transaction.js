import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Button from "@material-ui/core/Button";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});
const Transaction = (props) => {
<<<<<<< HEAD
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
          {row.createdAt}
        </TableCell>
        <TableCell align="center">{row.currency}</TableCell>
        <TableCell align="center">{row.recordType}</TableCell>
        <TableCell align="center">{row.paymentMode}</TableCell>
        <TableCell
          align="center"
          style={{
            color: row.recordType == "DEBIT" ? "green" : "red",
            fontSize: 20,
          }}
        >
          {row.amount}
        </TableCell>
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
                {/* <TableBody>
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
=======
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
                    {row.createdAt}
                </TableCell>
                <TableCell align="center">{row.buyerID}</TableCell>
                <TableCell align="center">{row.shopID}</TableCell>
                <TableCell align="center">{row.paymentMode}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details of the transaction
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Merchant ID</TableCell>
                                        <TableCell align="center">Previos balance</TableCell>
                                        <TableCell align="center">New balance</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row.date}>
                                        <TableCell component="th" scope="row">
                                            {row.updatedAt}
                                        </TableCell>
                                        <TableCell>{row.merchantID}</TableCell>
                                        <TableCell align="center">
                                            {row.previousBalance}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.newBalance}
                                        </TableCell>
                                    </TableRow>
>>>>>>> 9e89e2dd0d0438a729d5bbc70253edddd45bf747
                                    <Box m={1}>
                                        <Button variant="outlined" color="primary">
                                            Print Bill
                                        </Button>
                                    </Box>
<<<<<<< HEAD
                                </TableBody> */}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
=======
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
>>>>>>> 9e89e2dd0d0438a729d5bbc70253edddd45bf747
};
export default Transaction;
