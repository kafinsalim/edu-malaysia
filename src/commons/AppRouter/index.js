import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AppLayout from "../AppLayout";
import Dashboard from "../../pages/dashboard";
import Teachers from "../../pages/teacher";
import Clc from "../../pages/clc";
import Login from "../../pages/login";
// import Error404 from "../../pages/error";
import Assembly from "../../pages/assembly";
import { authentication } from "../../utils";

// set dynamic config based on initial client side state
const device = window && window.innerWidth < 960 ? "mobile-web" : "web";
const path = window.location.pathname;

export default function() {
  // check login
  const [auth, setAuth] = React.useState(authentication.checkLoggedInUser());

  const handleLogin = username => {
    document.cookie = `username=${username}`;
    setAuth(authentication.checkLoggedInUser());
    console.log(`handleLogin:${JSON.stringify(authentication.checkLoggedInUser())}`);
    return <Redirect to="/" />;
  };

  const handleLogout = () => {
    document.cookie = `username=`;
    setAuth(authentication.checkLoggedInUser());
    console.log(`handleLogout:${JSON.stringify(authentication.checkLoggedInUser())}`);
    return <Redirect to="/login" />;
  };

  return (
    <BrowserRouter>
      {!auth.isLogin ? (
        <Login onLogin={handleLogin} />
      ) : (
        <AppLayout layout={device} initialPath={path} auth={auth} onLogout={handleLogout}>
          <React.Suspense fallback={<h1>loading</h1>}>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/teacher" component={Teachers} />
              <Route path="/clc" component={Clc} />
              <Route path="/assembly" component={Assembly} />
              {/* <Route component={Error404} /> */}
              <Route component={() => <Redirect to="/" />} />
            </Switch>
          </React.Suspense>
        </AppLayout>
      )}
    </BrowserRouter>
  );
}
