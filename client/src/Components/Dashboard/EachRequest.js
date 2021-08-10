import { Avatar, Button, Card, IconButton } from "@material-ui/core";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import React from "react";
import "./EachRequest.css";
const EachRequest = () => {
  return (
    <Card>
      <div
        className="request"
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <Avatar>hj</Avatar>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="req-name">Gaadi Wala</div>
          <div className="req-locality">Ludhiana, Punjab</div>
          <div className="req-ratings">4.6 Jholas</div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div style={{ fontWeight: "600" }}>-500</div>
          <div style={{ color: "#d93737" }}>+230</div>
        </div>
        <div>
          <IconButton>
            <CheckCircleOutlineOutlinedIcon style={{ color: "green" }} />
          </IconButton>
          <IconButton>
            <CancelOutlinedIcon style={{ color: "#d93737" }} />
          </IconButton>
        </div>
      </div>
    </Card>
  );
};
export default EachRequest;
