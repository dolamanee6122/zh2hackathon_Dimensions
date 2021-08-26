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
import BASE_URL from "../../baseURL";
import { useState, useEffect } from "react";
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});
const fetchName = async (row, accountType) => {
  try {
    const id = JSON.parse(localStorage.getItem("userId"));
    const res = await fetch(BASE_URL + accountType + "s/" + id);
    const data = await res.json();
    // console.log(data.merchant.user);
    if (accountType === "MERCHANT")
      return data.merchant.user.firstName + " " + data.merchant.user.lastName;
    return data.buyer.user.firstName + " " + data.buyer.user.lastName;
  }
  catch {
    console.log("error in name");
    window.location.href = "/";
  }
}
const fetchShopName = async (row) => {
  try {
    const { shopID } = row;
    const res = await fetch(BASE_URL + "shop/" + shopID);
    const data = await res.json();
    return data.shop.shopName;
  }
  catch {
    window.locaction.href = "/";
  }
}
const getColor = (row, accountType) => {

  const { recordType } = row;
  if (accountType === "MERCHANT") {
    {
      if (recordType === "CREDIT")
        return "red";
      return "green";
    }
  }
  else {
    if (recordType === "CREDIT")
      return "green";
    return "red";

  }
}
const Transaction = (props) => {
  const { row } = props;
  const accountType = JSON.parse(localStorage.getItem("accountType"));
  const [name, setName] = useState("");
  const [shopName, setShopName] = useState("");
  const [color, setColor] = useState("")
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  console.log(color);
  useEffect(async () => {
    const name1 = await fetchName(row, accountType);
    const shopName1 = await fetchShopName(row);
    const color1 = getColor(row, accountType);
    setName(name1);
    setShopName(shopName1);
    setColor(color1);
  }, [])
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
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{shopName}</TableCell>
        <TableCell align="center">{row.paymentMode}</TableCell>
        <TableCell align="center" style={{ color: color }}>
          {row.amount}
          <div>{row.recordType}</div>
        </TableCell>
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
};
export default Transaction;
