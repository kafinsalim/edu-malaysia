import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { StoreProvider, createStore } from "easy-peasy";
import AppLayout from "../AppLayout";
import Dashboard from "../../pages/dashboard";
import Teachers from "../../pages/teacher";
import Clc from "../../pages/clc";
import Login from "../../pages/login";
import Error404 from "../../pages/error";

// set dynamic config based on initial client side state
const device = window && window.innerWidth < 960 ? "mobile-web" : "web";
const path = window.location.pathname;

export default function() {
  return (
    <BrowserRouter>
      <AppLayout layout={device} initialPath={path}>
        <React.Suspense fallback={<h1>loading</h1>}>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/teacher" component={Teachers} />
            <Route path="/clc" component={Clc} />
            {/* <Route path="/login" component={Login} /> */}
            <Route component={Error404} />
          </Switch>
        </React.Suspense>
      </AppLayout>
    </BrowserRouter>
  );
}
