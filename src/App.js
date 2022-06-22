import { hot } from "react-hot-loader/root";
import React from "react";
import { Switch, Route } from "react-router";

import Dashboard from "./components/Dashboard";
import Editor from "./components/Editor";
import GrapesJsEditor from "./components/GraphJsEditor";
import { PhotoInitials } from "./components/PhotoInitials";
import { Nav } from "./components/Shared/Nav";
import { Linebreak } from "./components/Linebreak";
import { Filler } from "./components/Filler";
import { StaffList } from "./components/Staff";
import AdminPage from "./components/Admin";

function App() {
  return (
    <div className="App">
      {/* <Nav /> */}
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/edit/:id" component={GrapesJsEditor} />
        <Route path="/photo" component={PhotoInitials} />
        <Route path="/staff" component={StaffList} />
        <Route path="/linebreak" component={Linebreak} />
        <Route path="/filler" component={Filler} />
        <Route path="/admin" component={AdminPage} />
      </Switch>
    </div>
  );
}

export default hot(App);
