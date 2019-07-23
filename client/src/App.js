import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar"
// import HabitsList from "./components/HabitsList"
// import EditHabit from "./components/EditHabit"
// import CreateHabit from "./components/CreateHabit"
// import CreateUser from "./components/CreateUser"

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={HabitsList} />
      <Route path="/edit/:id" component={EditHabit} />
      <Route path="/create" component={CreateHabit} />
      <Route path="/user" component={CreateUser} />

    </Router>
  );
}

export default App;
