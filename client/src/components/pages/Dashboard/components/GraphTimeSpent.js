import React, { Component } from "react";
// import axios from "axios";
import { Radar } from "react-chartjs-2";

class GraphHabitsTotal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: ["Run", "Walk", "Read", "Hike", "Sleep", "Meditation"],
                datasets: [
                    {
                        label: "Minutes",
                        data: [
                            20,
                            130,
                            90,
                            250,
                            37,
                            60
                        ],
                        backgroundColor: "#0056b3"
                    }
                ]
            }
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="chart" id="time-spent">
                <Radar
                    data={this.state.chartData}
                    height={500}
                    options={{
                        title: {
                            display: true,
                            text: "Time Logged",
                            fontSize: 25
                        }
                    }}
                />
            </div>
        )
    }
}

export default GraphHabitsTotal;