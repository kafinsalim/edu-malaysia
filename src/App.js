import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StoreProvider, createStore } from "easy-peasy";
import AppLayout from "./commons/AppLayout";
import Dashboard from "./pages/dashboard";
import Teachers from "./pages/teacher";
import Clc from "./pages/clc";
import "./App.css";

function AppRouter() {
  return (
    <BrowserRouter>
      <AppLayout>
        <React.Suspense fallback={<h1>loading</h1>}>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/teacher" component={Teachers} />
            <Route path="/clc" component={Clc} />
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
