import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppBar from "./components/appBar/AppBar";
import GridView from "./components/gridView/GridView";
import Register from "./components/register/Register";
import Login from "./components/register/Login";
import PrivateRoute from "./components/register/PrivateRoute";

export default function App() {
  const [barState, setBarState] = useState(true);

  const toggleRightSideBar = (e) => {
    e.preventDefault();
    setBarState(true);
  };
  // setAuth(true)

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact >
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/:id" exact auth={true}>
            <AppBar
              toggleRightSideBar={toggleRightSideBar}
              barState={barState}
            />
            <GridView
              toggleRightSideBar={toggleRightSideBar}
              barState={barState}
            />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}
