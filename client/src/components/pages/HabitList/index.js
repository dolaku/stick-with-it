import React, { Component } from "react";
import axios from "axios";
import EachHabit from "../EachHabit";


class HabitList extends Component {
    constructor(props) {
        super(props);

        this.deleteHabit = this.deleteHabit.bind(this);

        this.state = {
            habits: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:5000/habits/")
            .then(res => {
                console.log(res.data);
                this.setState({ habits: res.data })
            })
            .catch(err => console.log(err))
    }

    deleteHabit(id) {
        axios.delete("http://localhost:5000/habits/" + id)
            .then(res => console.log(res.data));

        this.setState({
            habits: this.state.habits.filter(item => item._id !== id)
        })
    }

    habitList() {
        console.log(this.state.habits);
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
                            <th>User</th>
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