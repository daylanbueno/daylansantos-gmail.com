import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./pages/Logon";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Incident from "./pages/Incident";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/Register" exact component={Register} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/incidents/new" exact component={Incident} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
