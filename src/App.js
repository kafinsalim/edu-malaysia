import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StoreProvider, createStore } from "easy-peasy";
import AppLayout from "./commons/AppLayout";
import Dashboard from "./pages/dashboard";
import Teachers from "./pages/teacher";
import Clc from "./pages/clc";
import Error404 from "./pages/error";
import "./App.css";

// set dynamic config based on initial client side state
const device = window && window.innerWidth < 721 ? "mobile-web" : "web";
const path = window.location.pathname;

function AppRouter() {
  return (
    <BrowserRouter>
      <AppLayout layout={device} initialPath={path}>
        <React.Suspense fallback={<h1>loading</h1>}>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/teacher" component={Teachers} />
            <Route path="/clc" component={Clc} />
            <Route component={Error404} />
          </Switch>
        </React.Suspense>
      </AppLayout>
    </BrowserRouter>
  );
}

function App() {
  return (
    // <StoreProvider store={store}>
    <AppRouter />
    // </StoreProvider>
  );
}

export default App;
