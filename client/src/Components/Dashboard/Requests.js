import React from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../baseURL";
import EachRequest from "./EachRequest";
export default function Requests({request,id,accountType}) {
  console.log('from Requests',request);


  async function acceptRequest(id){
    console.log("in accept");
    const URL=BASE_URL+"transaction/";
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestID: `${id}` })
  };
     fetch(`${URL}`,requestOptions)
     .then((response)=>console.log(`response`, response))
     .catch((err)=>console.log(`err`, err))
   
    // console.log(`info`, info);
  }

  async function rejectRequest(id){
    console.log("in accept");
    const URL=BASE_URL+"request/reject";
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestID: `${id}` })
  };
     fetch(`${URL}`,requestOptions)
     .then((response)=>console.log(`response`, response))
     .catch((err)=>console.log(`err`, err))
   
    // console.log(`info`, info);
  }

  return (
    <div>
      <div style={{ display: "flex", fontWeight:"600" }}>
        <div> Recent Requests</div>
      </div>
      <hr />
      {request.map((e)=>{
        return <EachRequest data={e} reqStatus={e.status} acceptRequest={acceptRequest} rejectRequest={rejectRequest}/>
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
