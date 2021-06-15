import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login";
import MainPanel from "./MainPanel";

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
    </BrowserRouter>
  );
};

export default App;
