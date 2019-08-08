import React, { Component } from "react";
import axios from "axios";
import EachHabit from "../EachHabit";

const root = "https://stick-with-it.herokuapp.com/";

class HabitList extends Component {
    constructor(props) {
        super(props);

        this.deleteHabit = this.deleteHabit.bind(this);

        this.state = {
            habits: []
        };
    }

    componentDidMount() {

        let auth = document.getElementById("user-greeting");
        if (auth) {
            auth = auth.getAttribute("data-user");
            
            axios.get(root + "/habits/")
                .then(res => {
                    let data = res.data;
    
                    // filter by user 
                    data = data.filter(item => item.user === auth);
                    this.setState({ habits: data })
                })
                .catch(err => console.log(err))
        }
    }

    deleteHabit(id) {
        axios.delete(root + "/habits/" + id)
            .then(res => console.log(res.data));

        this.setState({
            habits: this.state.habits.filter(item => item._id !== id)
        })
    }

    habitList() {
        return this.state.habits.map(currentHabit => {
            return <EachHabit habit={currentHabit} deleteHabit={this.deleteHabit} key={currentHabit._id} />;
        })
    }

    render() {
        return (
            <div>
                <h1>Habit List</h1>
                <table className="table mt-3">
                    <thead className="thead-light">
                        <tr>
                            <th>Habit</th>
                            <th>Type</th>
                            <th>Duration</th>
                            <th>Sets - Reps</th>
                            <th>Notes</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.habitList() }
                    </tbody>
                </table>
            </div>
        )
    }
}


export default HabitList;