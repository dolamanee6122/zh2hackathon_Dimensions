import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles({
  statcard: {},
  valueGreen: {
    fontWeight: 600,
    color: "green"
  },
  totalValue: {
    fontWeight: 600,
    fontSize: "24px"
  },
  valueRed: {
    fontWeight: 600,
    color: "#d93737"
  },
  statcardHeader: {
    fontWeight: 600
  }
});
export default function StatCards({ title, balance, lastUpdated }) {
  const classes = useStyles();
  return (
    <div className={classes.statcard}>
      <div className={classes.statcardHeader} style={{ display: "flex" }}>
        <div>{title}</div>
        <div style={{ marginLeft: "auto" }}>{lastUpdated}</div>
      </div>
      <hr />
      <div className={classes.totalValue}>
        ₹ {Math.abs(balance.balance)}({balance.balance > 0 ? "+" : "-"})
      </div>
      <br />
      <div style={{ display: "flex", fontSize: "18px" }}>
        <div>
          Credit
          <div className={classes.valueRed}>{balance.credit}</div>
        </div>
        <div style={{ marginLeft: "auto", marginRight: "48px" }}>
          Debit
          <div className={classes.valueGreen}>{balance.debit}</div>
        </div>
      </div>
      <br />
      <div>
      </div>
    </div>
  );
}
