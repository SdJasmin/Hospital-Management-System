import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Router wraps the whole app
import AppRoutes from "./Routes"; // Import the routes

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
