import React, { Component } from "react";
import axios from "axios";
import { HorizontalBar } from "react-chartjs-2";

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
                let uniqueLabelsCounts = [];
                
                // get habit labels - filter by user
                data = data.filter(item => item.user === this.state.username);

                data.forEach(item => {
                    dataLabels.push(item.habitName);
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
                uniqueLabelsCounts.push(0);
                
                this.setState({
                    chartData: {
                        labels: uniqueLabels,
                        datasets: [
                            {
                                label: "Count",
                                data: uniqueLabelsCounts,
                                backgroundColor: "#0056b380"
                            }
                        ]
                    }
                })
            })
            .catch(err => console.log(err))
    }
    

    render() {
        return (
            <div className="chart" id="habit-total">
                <HorizontalBar
                    data={this.state.chartData}
                    height={130}
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