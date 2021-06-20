import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login";
import MainPanel from "./MainPanel";
import Limits from "./Limits";
import SpendMoney from "./SpendMoney";
import Charts from "./Charts";

import "../css/App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/panel">
        <MainPanel />
      </Route>
      <Route path="/Limits">
        <Limits />
      </Route>
      <Route path="/Spendmoney">
        <SpendMoney />
      </Route>
      <Route path="/Charts">
        <Charts />
      </Route>
    </BrowserRouter>
  );
};

export default App;
