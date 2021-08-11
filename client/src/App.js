import './App.css';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import RequestListing from './Components/RequestPage/RequestListing';
import Dashboard from './Components/Dashboard/Dashboard';

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
      </Switch>
    </Router>
    </div>
  );
}

export default App;
