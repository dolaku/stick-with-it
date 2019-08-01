import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Dashboard from "./components/pages/Dashboard"
import CreateHabit from "./components/pages/CreateHabit"
import HabitList from "./components/pages/HabitList"

class App extends Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <Navbar />
          <div className="mt-2 mb-auto text-center">
            <Route path="/" exact component={Dashboard} />
            <Route path="/create/" component={CreateHabit} />
            <Route path="/habit-list" component={HabitList} />
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
