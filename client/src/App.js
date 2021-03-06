import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import PrivacyPolicy from "./components/layout/Footer/PrivacyPolicy"
import Dashboard from "./components/pages/Dashboard"
import CreateHabit from "./components/pages/CreateHabit"
import EditHabit from "./components/pages/EditHabit"
import HabitList from "./components/pages/HabitList"

class App extends Component {

  state = {
    email: ""
  }

  handleState = (userEmail) => {
    this.setState({
      email: userEmail
    })
  }


  render() {
    return(
      <Router>
        <div className="wrapper">
          <Navbar handleState={this.handleState} />
          <div className="mt-2 mb-auto text-center">
            <Switch>
              <Route path="/" exact render={routeProps => (<Dashboard {...routeProps} email={this.state.email} />)} />
              <Route path="/create/" component={CreateHabit} />
              <Route path="/habit-list" component={HabitList} />
              <Route path="/edit" component={EditHabit} />
              <Route path="/privacy" component={PrivacyPolicy} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
