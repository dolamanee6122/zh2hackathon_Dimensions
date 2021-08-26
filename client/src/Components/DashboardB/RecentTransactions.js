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

const allrows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  )
];
const creditrows = [
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  )
];
const debitrows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  )
];

export default function RecentTransactions() {
  const [trxnType, setTrxnType] = useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setTrxnType(newValue);
  };
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
        rows={trxnType ? (trxnType === 1 ? creditrows : debitrows) : allrows}
      />
    </>
  );
}

// import React, { useState } from "react";
// import Link from "@material-ui/core/Link";
// import { makeStyles } from "@material-ui/core/styles";
// import TrxnTable from "./TrxnTable";
// import { Tab, Tabs } from "@material-ui/core";
// import ImportExportIcon from "@material-ui/icons/ImportExport";
// import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
// import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
// // Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }

// export default function RecentTransactions({trxns}) {
//   console.log(` from Recent trxns`, trxns)
//   const [trxnType, setTrxnType] = useState(0);
//   const handleChange = (event, newValue) => {
//     console.log(newValue);
//     setTrxnType(newValue);
//   };

//   const debitRows= trxns.filter((e)=>{
//     return (e.recordType==='DEBIT')
//   })

//   const creditRows= trxns.filter((e)=>{
//     return (e.recordType==='CREDIT')
//   })

//   console.log('feffe',debitRows,"jvbdbjbw",creditRows);

//   return (
//     <>
//       <div style={{ display: "flex" }}>
//         <h3>Recent Transactions</h3>
//         <div style={{ marginLeft: "auto", display: "flex" }}>
//           <Tabs
//             value={trxnType}
//             onChange={handleChange}
//             indicatorColor="primary"
//             textColor="primary"
//             aria-label="icon tabs example"
//           >
//             <Tab icon={<ImportExportIcon />} label="ALL" />
//             <Tab icon={<ArrowUpwardIcon />} label="CREDIT" />
//             <Tab icon={<ArrowDownwardIcon />} label="DEBIT" />
//           </Tabs>
//         </div>
//       </div>

//       <TrxnTable
//         rows={trxnType===0?trxns:(trxnType===1?creditRows:debitRows)}
//       />
//     </>
//   );
// }
