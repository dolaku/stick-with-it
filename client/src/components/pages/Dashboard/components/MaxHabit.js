import React, { Component } from "react";
import axios from "axios";

const root = "https://stick-with-it.herokuapp.com";

class MaxHabit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            maxHabit: 0,
            habit: ""
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
                let max;
                let index;

                // max of array numbers
                const arrMax = arr => Math.max(...arr);
                
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

                max = arrMax(uniqueLabelsCounts);
                index = uniqueLabelsCounts.indexOf(max);

                this.setState({ habit: uniqueLabels[index] })
            })
            .catch(err => console.log(err))
    }
    

    render() {
        return (
            <div className="chart chart-stat" id="max-stat">
                <h4>Max Type:</h4>
                <h6><strong>{this.state.habit}</strong></h6>
                <h2 className="display-2">{ this.state.maxHabit }</h2>
            </div>
        )
    }
}

export default MaxHabit;