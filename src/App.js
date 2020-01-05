import React from "react";
import AppRouter from "./commons/AppRouter";
import ErrorBoundary from "./commons/ErrorBoundary";
import "moment/locale/id";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
}

export default App;
