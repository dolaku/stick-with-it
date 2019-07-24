import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Login from "./components/auth/Login"
import Dashboard from "./components/pages/Dashboard"
import EditHabit from "./components/pages/EditHabit"
import CreateHabit from "./components/pages/CreateHabit"
import HabitList from "./components/pages/HabitList"

class App extends Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <Navbar />
          <div className="mt-5 pt-4 mb-auto">
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={Dashboard} />
            <Route path="/edit/:id" component={EditHabit} />
            <Route path="/create" component={CreateHabit} />
            <Route path="/habit-list" component={HabitList} />
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
