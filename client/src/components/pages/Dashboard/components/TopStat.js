import React, { Component } from "react";
import axios from "axios";

const root = "https://stick-with-it.herokuapp.com";

class GraphHabitTypes extends Component {

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
                let uniqueLabelsCounts = [];
                
                // get habit types - filter by user
                data = data.filter(item => item.user === this.state.username);

                data.forEach(item => {
                    dataLabels.push(item.type);
                })

                for (let i = 0; i < dataLabels.length; i++) {
                    dataTotals[dataLabels[i]] = 1 + (dataTotals[dataLabels[i]] || 0);
                }
           

                for ( let key in dataTotals ) {
                    uniqueLabels.push(key);
                    if (dataTotals.hasOwnProperty(key)) {
                        uniqueLabelsCounts.push(dataTotals[key]);
                    }
                }
                
                console.log(uniqueLabels);
                console.log(uniqueLabelsCounts);

                this.setState({
                    chartData: {
                        labels: uniqueLabels,
                        datasets: [
                            {
                                label: "Count",
                                data: uniqueLabelsCounts,
                                backgroundColor: "#0056b3"
                            }
                        ],
                        options: {
                            scales: {
                                xAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        min: 0,
                                        stepSize: 1,
                                        max: 4
                                    }
                                }]
                            }
                        }
                    }
                })
            })
            .catch(err => console.log(err))
    }
    

    render() {
        return (
            <div className="chart chart-stat" id="top-stat">
                
            </div>
        )
    }
}

export default GraphHabitTypes;