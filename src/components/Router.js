import React, { useState, useEffect } from "react";
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectWho, setSelectWho] = useState("all");

  useEffect(() => {
    const {
      multiFactor: {
        user: { email },
      },
    } = userObj;
    if (email === "tosico85@gmail.com") {
      setIsAdmin(true);
    }
  }, []);

  const onChangeView = (who) => {
    console.log(who);
    setSelectWho(who);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <Navigation isAdmin={isAdmin} onChangeView={onChangeView}></Navigation>
      ) : (
        ""
      )}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/regist">
              <Regist userObj={userObj} />
            </Route>
            <Route exact path="/">
              <Home userObj={userObj} selectWho={selectWho} />
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
