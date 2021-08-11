import React from "react";
import { Link } from "react-router-dom";
import EachRequest from "./EachRequest";
export default function Requests({request,id,accountType}) {
  console.log('from Requests',request);

  return (
    <div>
      <div style={{ display: "flex", fontWeight:"600" }}>
        <div> Recent Requests</div>
      </div>
      <hr />
      {request.map((e)=>{
        return <EachRequest data={e}/>
      })}
      <div>
        <Link to={{
          pathname:"/requests",
          props:{
            id:{id},
            accountType:{accountType}
          }
        }}>See More Requests</Link>
      </div>

    </div>
  );
}
