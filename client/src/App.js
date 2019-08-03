import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Dashboard from "./components/pages/Dashboard"
import CreateHabit from "./components/pages/CreateHabit"
import HabitList from "./components/pages/HabitList"
import Public from "./components/auth/Public";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <Navbar />
          <div className="mt-2 mb-auto text-center">
            <Route path="/public" exact component={Public} />
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
