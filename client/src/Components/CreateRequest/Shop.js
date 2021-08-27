import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import BASE_URL from "../../baseURL";

const useStyles = makeStyles((theme) => ({
    container: {
      padding: "2px 4px",
    display: "flex",
    flexDirection : "column",
      width: 400,
      border: "1px solid cyan",
      margin: "10px",
      borderRadius : "10px",
    },

  }));
  
export default function Shop(params){
    const classes = useStyles();
    const [shop,setShop] = useState({});
    useEffect(()=>{
        // console.log(params.shopDetails);
        setShop(JSON.parse(params.shopDetails));
        console.log(JSON.parse(params.shopDetails).address.line1);
    },[]);
    // useEffect(async ()=>{
    //     const res = await fetch(BASE_URL + `shop/${params.shiopID}`);
    //     const data = await res.json();
    //     console.log(data.shop);
    //     setShop(data.shop);
    // },[]);
    return (
        <div className={classes.container} onClick={params.saelectedShop}>
        <div ><h4>{shop.shopName} </h4></div>
        {shop.address !== undefined && (<div style={{display:"block",textDecoration:"none"}}>
            <div>Address: {shop.address.line1}</div>
        <div>{shop.address.line2},{shop.address.city},Pin Code: {shop.address.pinCode}</div></div>
        ) }
        <div style={{display:"block"}}>Rating: {shop.rating}</div>
        </div>
    );
}