import './App.css';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import RequestListing from './Components/RequestPage/RequestListing';
import Dashboard from './Components/Dashboard/Dashboard';
import Transaction from './Components/Dashboard/Transaction/Transactions';
import Login from './Components/Authentication/Login';
import { useState } from 'react';
import { useCreds } from './Components/Authentication/useCreds';

// function setCreds(id,token){
//   sessionStorage.setItem('token', JSON.stringify(token));
//   sessionStorage.setItem('id', JSON.stringify(id));
// }

// function getToken(){
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token
// }
//  function getId()
//  {
//   const idString = sessionStorage.getItem('id');
//   const userId = JSON.parse(idString);
//   return userId?.token
//  }

//  function getCreds()
//  {
//    const id=getId();
//    const token=getToken();
//    return {id:id,token:token};
//  }

function App() {
  const { creds, setCreds } = useCreds();
  // const creds=getCreds();
  const id= creds.id;
  const token =creds.token;
  const accountType=creds.accountType;
  if(!token){
    return <Login setCreds={setCreds}/>
  }

  return (
    <div className="App">
     <Router>
      <Switch>
        <Route exact path="/">
          {accountType==="MERCHANT" && <Dashboard />}
          {accountType==="BUYER" && <Dashboard />}
        </Route>
        <Route path="/requests">
          <RequestListing />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
