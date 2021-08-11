import { Avatar, Button, Card, IconButton } from "@material-ui/core";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import React from "react";
import "./EachRequest.css";
const EachRequest = ({data}) => {
  console.log(`data`, data)
  return (
    <Card>
      <div
        className="request"
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <Avatar>{data.buyer.buyerName.toUpperCase()[0]}</Avatar>
        <div style={{ display: "flex", flexDirection: "column" ,alignItems:"flex-start" }}>
          <div className="req-name">{data.buyer.buyerName}</div>
          <div className="req-paymentmode">{data.paymentMode.toUpperCase()}</div>
          { data.balanceShopWise.debit===0 && data.balanceShopWise.credit===0 && <div className="new">NEW!</div>}
          { (data.balanceShopWise.credit!==0 || data.balanceShopWise.debit !==0) && <div className="req-balance">{data.balanceShopWise.balance}</div>}
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div style={{ fontWeight: "600", fontSize:"22px" }}>{data.amount}</div>
          <div className={data.recordType==="CREDIT"?"red":"green"}>{data.recordType}</div>
          {/* <div style={{ color: "#d93737" }}>+230</div> */}
        </div>
        {data.status==="PENDING" &&
        <div>
          <IconButton>
            <CheckCircleOutlineOutlinedIcon style={{ color: "green" }} />
          </IconButton>
          <IconButton>
            <CancelOutlinedIcon style={{ color: "#d93737" }} />
          </IconButton>
        </div>}
        {data.status!=="PENDING" &&
        <div>
          <p style={{fontWeight:"600", marginLeft:"24px"}} className={data.status==="APPROVED"?"green":"red"} >{data.status}</p>
        </div>}
        
      </div>
    </Card>
  );
};
export default EachRequest;
