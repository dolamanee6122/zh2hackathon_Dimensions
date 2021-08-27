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
  return (
    <div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right"> Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.createdAt.substr(0,10)}</TableCell>
              <TableCell>{row.shopName}</TableCell>
              <TableCell>{row.merchantName}</TableCell>
              <TableCell>{row.paymentMode}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
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
