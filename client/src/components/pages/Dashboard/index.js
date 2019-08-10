import React, { Component } from "react";
import "./style.css";

import HabitTotal from "./components/GraphHabitsTotal";
import HabitTypes from "./components/GraphHabitTypes";
import TimeSpent from "./components/GraphTimeSpent";
import TotalCount from "./components/TotalCount";
import MaxHabit from "./components/MaxHabit";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        }
    }
    
    componentDidMount() {
        this.setState({
            email: this.props.email
        })
    }

    handleState(userEmail) {
        this.setState({
            email: userEmail
        })
    }

    render() {
        return (
            <div className="m-3">
                <h1>Dashboard</h1>
                <div id="dashboard-container" key={this.props.email}>
                    <div className="chart chart-stat" id="a">
                        <h3>Keep up the good work!</h3>
                    </div>
                    <HabitTypes />
                    <TotalCount />
                    <MaxHabit />
                    <div className="chart chart-stat" id="b">
                        <h3 className="display-1">👏</h3>
                    </div>
                    <TimeSpent />
                    <HabitTotal />
                </div>
            </div>
        )
    }
}


export default Dashboard;