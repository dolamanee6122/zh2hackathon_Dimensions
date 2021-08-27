import { Avatar, Button, Card, IconButton } from "@material-ui/core";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import React from "react";
import "./EachRequest.css";
import BASE_URL from "../../baseURL";
import { useState } from "react";
const EachRequest = ({data,reqStatus,acceptRequest,rejectRequest}) => {
 
  console.log(`data`, data._id)
   const id =data._id;
  // async function acceptRequest(id){
  //   console.log("in accept");
  //   const URL=BASE_URL+"transaction/";
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ requestID: `${id}` })
  // };
  //    fetch(`${URL}`,requestOptions)
  //    .then((response)=>console.log(`response`, response))
  //    .catch((err)=>console.log(`err`, err))
   
  //   // console.log(`info`, info);
  // }
  // async function rejectRequest(id){
  //   console.log("in accept");
  //   const URL=BASE_URL+"request/reject";
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ requestID: `${id}` })
  // };
  //    fetch(`${URL}`,requestOptions)
  //    .then((response)=>console.log(`response`, response))
  //    .catch((err)=>console.log(`err`, err))
   
  //   // console.log(`info`, info);
  // }

  const handleAcceptance=(e)=>{
    e.preventDefault();
    setStatus("APPROVED");
    console.log("acceptance called")
    acceptRequest(id);
  }

  const handleRejection=(e)=>{
    e.preventDefault();
    setStatus("REJECTED");

    console.log("Rejection called")
    rejectRequest(id);

  }
  const [status,setStatus]=useState(reqStatus);


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
          <IconButton onClick={handleAcceptance}>
            <CheckCircleOutlineOutlinedIcon style={{ color: "green" }} />
          </IconButton>
          <IconButton onClick={handleRejection}>
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
