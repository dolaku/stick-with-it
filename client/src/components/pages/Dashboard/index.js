import React, { Component } from "react";
import "./style.css";

import HabitTotal from "./components/GraphHabitsTotal";
import TimeSpent from "./components/GraphTimeSpent";

class Dashboard extends Component {

    render() {
        return (
            <div className="m-3">
                <h1>Dashboard</h1>
                <div id="dashboard-container">
                    <HabitTotal />
                    <TimeSpent />
                    <div className="chart" id="a">A</div>
                    <div className="chart" id="b">B</div>
                    <div className="chart" id="c">C</div>
                    <div className="chart" id="d">D</div>
                </div>
            </div>
        )
    }
}


export default Dashboard;