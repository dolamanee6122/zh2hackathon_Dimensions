import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import React from "react";

const TrxnTable = ({ rows }) => {
  console.log(`rows in Trxn Tbale ***********************************`, rows)
  return (
    <div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Method</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell ></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.updatedAt.substr(0,10)}</TableCell>
              <TableCell>{row.buyerName}</TableCell>
              <TableCell>{row.shopName}</TableCell>
              <TableCell>{row.paymentMode}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell >{row.recordType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <Link color="primary" href="/transactions">
          See more Transactions
        </Link>
      </div>
    </div>
  );
};
export default TrxnTable;
