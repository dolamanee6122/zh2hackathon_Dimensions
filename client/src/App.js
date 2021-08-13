import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import RequestListing from "./Components/RequestPage/RequestListing";
import Dashboard from "./Components/Dashboard/Dashboard";
import Transaction from "./Components/Dashboard/Transaction/Transactions";
import CreateRequest from "./Components/CreateRequest";
import AddShop from "./Components/AddShop";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/requests">
            <RequestListing />
          </Route>
          <Route path="/transactions">
            <Transaction />
          </Route>
          <Route path="/createrequest">
            <CreateRequest />
          </Route>
          <Route path="/addshop">
            <AddShop />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
