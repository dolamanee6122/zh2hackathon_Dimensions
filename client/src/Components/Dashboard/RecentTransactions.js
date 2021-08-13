import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TrxnTable from "./TrxnTable";
import { Tab, Tabs } from "@material-ui/core";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

export default function RecentTransactions({trxns}) {
  console.log(` from Recent trxns`, trxns)
  const [trxnType, setTrxnType] = useState(0);
  const handleChange = (event, newValue) => {
    console.log(newValue);
    setTrxnType(newValue);
  };

  const debitRows= trxns.filter((e)=>{
    return (e.recordType==='DEBIT')
  })

  const creditRows= trxns.filter((e)=>{
    return (e.recordType==='CREDIT')
  })

  console.log('feffe',debitRows,"jvbdbjbw",creditRows);

  return (
    <>
      <div style={{ display: "flex" }}>
        <h3>Recent Transactions</h3>
        <div style={{ marginLeft: "auto", display: "flex" }}>
          <Tabs
            value={trxnType}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon tabs example"
          >
            <Tab icon={<ImportExportIcon />} label="ALL" />
            <Tab icon={<ArrowUpwardIcon />} label="CREDIT" />
            <Tab icon={<ArrowDownwardIcon />} label="DEBIT" />
          </Tabs>
        </div>
      </div>

      <TrxnTable
        rows={trxnType===0?trxns:(trxnType===1?creditRows:debitRows)}
      />
    </>
  );
}
