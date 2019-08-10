import React, { Component } from "react";
import axios from "axios";
import { Radar } from "react-chartjs-2";

const root = "https://stick-with-it.herokuapp.com";

class GraphHabitsTotal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            chartData: {}
        }
    }

    componentDidMount() {
        let auth = document.getElementById("user-greeting");
        if (auth) {
            auth = auth.getAttribute("data-user");
            this.setState({ username: auth });
        }
    }

    componentWillMount() {
        this.getChartData();
    }

    getChartData() {    
        axios.get(root + "/habits/")
            .then(res => {
                let data = res.data;
                let dataLabels = [];
                let exerciseCount = 0;
                let healthCount = 0;
                let studyCount = 0;
                let workCount = 0;
                
                // get habit labels - filter by user
                data = data.filter(item => item.user === this.state.username);

                data.forEach(item => {
                    dataLabels.push(item.habitName);
                })

                console.log(data);

                data.map((item) => {
                    switch (item.type) {
                        case "Exercise":
                            exerciseCount += 1;
                            break;
                        case "Health":
                            healthCount += 1;
                            break;
                        case "Study":
                            studyCount += 1;
                            break;
                        case "Work":
                            workCount += 1;
                            break;
                        default: return;
                    }
                });

                console.log(exerciseCount);
                console.log(healthCount);
                console.log(studyCount);
                console.log(workCount);

                
                
                this.setState({
                    // chartData: {
                    //     labels: uniqueLabels,
                    //     datasets: [
                    //         {
                    //             label: "Minutes",
                    //             data: uniqueLabelsTimes,
                    //             backgroundColor: "#0056b3"
                    //         }
                    //     ]
                    // }
                })
            })
            .catch(err => console.log(err))
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