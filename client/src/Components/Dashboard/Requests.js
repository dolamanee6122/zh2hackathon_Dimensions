import React from "react";
import { Link } from "react-router-dom";
import EachRequest from "./EachRequest";
export default function Requests() {
  return (
    <div>
      <h4>Requests</h4>
      <EachRequest />
      <EachRequest />
      <EachRequest />
      <div>
        <Link to="/requests">See More Requests</Link>
      </div>

      {/*Loop thru*/}
      {/*Render*/}
      {/*Link*/}
    </div>
  );
}
