import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateHabit extends Component {

    constructor(props) {
        super(props);
        this.textInput = React.createRef();

        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangehabitName = this.onChangehabitName.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDurUnits = this.onChangeDurUnits.bind(this);
        this.onChangeSets = this.onChangeSets.bind(this);
        this.onChangeReps = this.onChangeReps.bind(this);
        this.onChangeNotes = this.onChangeNotes.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            user: "",
            habitName: "",
            type: "",
            duration: 0,
            durUnits: "",
            sets: 0,
            reps: 0,
            notes: "",
            date: new Date(),
            accounts: []
        }
    }

    // a React lifecycle method - auto executed
    // loads this block right before anything renders to the page
    componentDidMount() {
        this.setState({
            accounts: ["test user", "second user"],
            user: "test user"
        })
    }
    
    // methods to set values
    onChangeUser(event) {
        this.setState({
            user: event.target.value
        });
    }
    onChangehabitName(event) {
        this.setState({
            habitName: event.target.value
        });
    }
    onChangeType(event) {
        this.setState({
            type: event.target.value
        });
    }
    onChangeDuration(event) {
        this.setState({
            duration: event.target.value
        });
    }
    onChangeDurUnits(event) {
        this.setState({
            durUnits: event.target.value
        });
    }
    onChangeSets(event) {
        this.setState({
            sets: event.target.value
        });
    }
    onChangeReps(event) {
        this.setState({
            reps: event.target.value
        });
    }
    onChangeNotes(event) {
        this.setState({
            notes: event.target.value
        });
    }
    onChangeDate(date) {
        this.setState({
            date
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const habit = {
            user: this.state.user,
            habitName: this.state.habitName,
            type: this.state.type,
            duration: this.state.duration,
            durUnits: this.state.durUnits,
            sets: this.state.sets,
            reps: this.state.reps,
            notes: this.state.notes,
            date: this.state.date
        }
        console.log(habit);

        axios.post("http://localhost:5000/habits/add", habit)
            .then(res => console.log(res.data));

        window.location = "/";
    }

    render() {
        return (
            <div>
                <h1>Create A New Habit Log</h1>
                <form onSubmit={this.onSubmit} className="text-left">
                    <div className="form-group">
                        <label>User: </label>
                        <select ref={this.textInput}
                            required
                            className="form-control"
                            value={this.state.user}
                            onChange={this.onChangeUser}>
                            {
                                this.state.accounts.map(function(account) {
                                    return (
                                        <option
                                            key={account}
                                            value={account}>
                                            {account}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div>
                        <label>Habit: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.habitName}
                            onChange={this.onChangehabitName} 
                            />
                    </div>

                    <div>
                        <label>Type: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.type}
                            onChange={this.onChangeType} 
                            />
                    </div>

                    <div>
                        <label>Duration: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration} 
                            />
                    </div>

                    <div>
                        <label>Units: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.durUnits}
                            onChange={this.onChangeDurUnits} 
                            />
                    </div>

                    <div>
                        <label>Sets: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.sets}
                            onChange={this.onChangeSets} 
                            />
                    </div>

                    <div>
                        <label>Reps: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.reps}
                            onChange={this.onChangeReps} 
                            />
                    </div>

                    <div>
                        <label>Notes: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.notes}
                            onChange={this.onChangeNotes} 
                            />
                    </div>

                    <div>
                        <label>Date: </label>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate} 
                            />
                    </div>

                    <div className="form-group">
                        <input 
                            type="submit"
                            value="Add a Habit"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        )
    }
}


export default CreateHabit;