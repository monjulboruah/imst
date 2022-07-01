import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./Global";
import Topbar from "./component/topbar/Topbar";
import Sidebar from "./component/sidebar/Sidebar";
import AllPages from "./component/AllPages";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="app">
          <div className="topbar-class">
            <Topbar />
          </div>
          <div className="container">
            <div className="sidebar-class">
              <Sidebar />
            </div>
            <div className="all-page-class">
              <AllPages />
            </div>
          </div>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
