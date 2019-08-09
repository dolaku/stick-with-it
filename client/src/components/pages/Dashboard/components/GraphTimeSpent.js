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
                let dataTotals = {};
                let uniqueLabels = [];
                let uniqueLabelsTimes = [];
                
                // get habit labels - filter by user
                data = data.filter(item => item.user === this.state.username);

                data.forEach(item => {
                    dataLabels.push(item.habitName);
                })

                console.log(data);

                for (let i = 0; i < dataLabels.length; i++) {
                    dataTotals[dataLabels[i]] = 1 + (dataTotals[dataLabels[i]] || 0);
                }
           

                for ( let key in dataTotals ) {
                    uniqueLabels.push(key);
                    if (dataTotals.hasOwnProperty(key)) {
                        uniqueLabelsTimes.push(dataTotals[key]);
                    }
                }
                
                this.setState({
                    chartData: {
                        labels: uniqueLabels,
                        datasets: [
                            {
                                label: "Minutes",
                                data: uniqueLabelsTimes,
                                backgroundColor: "#0056b3"
                            }
                        ]
                    }
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