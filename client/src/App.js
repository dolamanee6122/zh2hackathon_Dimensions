import './App.css';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import RequestListing from './Components/RequestPage/RequestListing';
import Dashboard from './Components/Dashboard/Dashboard';
import Transaction from './Components/Dashboard/Transaction/Transactions';
import Login from './Components/Authentication/Login';
import { useState } from 'react';
import { useCreds } from './Components/Authentication/useCreds';



function App() {
  const { creds, setCreds } = useCreds();
  // const creds=getCreds();
  const id= creds.id;
  const token =creds.token;
  const accountType=creds.accountType;
  if(!token){
    return <Login setCreds={setCreds}/>
  }

  const handleLogout=(e)=>{
    e.preventDefault();
    window.location.reload(true);
    sessionStorage.clear();
  }


  <Route
  path='/dashboard'
  render={(props) => (
    <Dashboard {...props} isAuthed={true} />
  )}
/>
{accountType==="MERCHANT" && <Dashboard />}
{accountType==="BUYER" && <Dashboard />}

  return (
    <div className="App">
     <Router>
      <Switch>
        <Route 
        exact path="/"
        render={(props) => (
          <Dashboard {...props} handleLogout={handleLogout} />
        )}
        />
       <Route 
        path="/requests"
        render={(props) => (
          <RequestListing {...props} handleLogout={handleLogout} />
        )}
        />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
