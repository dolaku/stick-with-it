import React, { Component } from "react";
import axios from "axios";

const root = "https://stick-with-it.herokuapp.com";

class TopStat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            totalLogged: 0
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
                let sum;

                // sum of array numbers
                const arrSum = arr => arr.reduce((a,b) => a + b, 0)
                
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
                
                sum = arrSum(uniqueLabelsCounts);

                this.setState({ totalLogged: sum })
            })
            .catch(err => console.log(err))
    }
    

    render() {
        return (
            <div className="chart chart-stat" id="top-stat">
                <h4>Total Logs</h4>
                <h2 className="display-2">{ this.state.totalLogged }</h2>
            </div>
        )
    }
}

export default TopStat;