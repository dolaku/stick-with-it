import React, { Component } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const root = "http://localhost:5000";

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
                let resLabel = [];
                
                // filter by user
                data = data.filter(item => item.user === this.state.username);

                data.forEach(item => {
                    if (!resLabel.includes(item.habitName)) {
                        resLabel.push(item.habitName)
                    }
                })
                
                console.log(resLabel);
                
                this.setState({
                    chartData: {
                        labels: resLabel,
                        datasets: [
                            {
                                label: "Count",
                                data: [
                                    2,
                                    3,
                                    1,
                                    0
                                ],
                                backgroundColor: "#0056b3"
                            }
                        ]
                    }
                })
                
                console.log(this.state.labels);
            })
            .catch(err => console.log(err))
    }
    

    render() {
        return (
            <div className="chart" id="habit-total">
                <Bar
                    data={this.state.chartData}
                    height={90}
                    options={{
                        title: {
                            display: true,
                            text: "Number of Habits Logged",
                            fontSize: 25
                        }
                    }}
                />
            </div>
        )
    }
}

export default GraphHabitsTotal;