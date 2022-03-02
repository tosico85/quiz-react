import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "routes/Home";
import Navigation from "components/Navigation";
// import SignIn from "routes/SignIn";
import Auth from "routes/Auth";
import Regist from "routes/Regist";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn ? <Navigation></Navigation> : ""}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/regist">
              <Regist userObj={userObj} />
            </Route>
            <Redirect from="/*" to="/" />
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Redirect from="/*" to="/" />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
