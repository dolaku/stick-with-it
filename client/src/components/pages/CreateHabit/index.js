import React, { Component } from "react";
import axios from "axios";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const root = "https://stick-with-it.herokuapp.com/";
let inputType = document.getElementById("input-type");

class CreateHabit extends Component {

    constructor(props) {
        super(props);
        this.textInput = React.createRef();

        this.onChangehabitName = this.onChangehabitName.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDurUnits = this.onChangeDurUnits.bind(this);
        this.onChangeNotes = this.onChangeNotes.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            user: "",
            type: "",
            habitName: "",
            duration: 10,
            durUnits: "",
            notes: "",
            weight: null,
            date: new Date(),

            units: ["Min", "Times"],
            typesArray: ["--Select One--", "Exercise", "Health", "Limit Bad Habits", "Study", "Work"],
            exerciseArray: ["", "Bicycling", "Climbing", "Dancing", "Hiking", "Running", "Sports", "Stretching", "Walking", "Weight Lifting", "Yoga", "Other"],
            healthArray: ["", "Checkups", "Meditate", "Sleep", "Track Weight", "Other"],
            badHabitsArray: ["", "Limit TV Time", "Stop Drug Use", "Stop Smoking", "Other"],
            study: ["", "Prepare for Exam", "Read a Book", "Review/Practice", "Other"],
            work: ["", "Apply for a New Job", "Networking", "Organize Computer Files", "Organize Workspace", "Plan the Day", "Other"]
        }
    }

    // a React lifecycle method - auto executed
    // loads this block right before anything renders to the page
    componentDidMount() {
        const username = document.getElementById("user-greeting")
        let userEmail = "";
        if (username) {
            userEmail = username.getAttribute("data-user");
        }

        this.setState({ user: userEmail});
    }

    displayHabitList() {
        switch (inputType.value) {
            case "Exercise":
                this.setState({ notes: "Changed" });
                break;
            case "Health":

                break;
            case "Limit Bad Habits":

                break;
            case "Study":

                break;
            case "Work":

                break;
            default:
        }
    }

    // methods to set values
    onChangeType(event) {
        this.setState({
            type: event.target.value
        });
    }
    onChangehabitName(event) {
        this.setState({
            habitName: event.target.value
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
    onChangeNotes(event) {
        this.setState({
            notes: event.target.value
        });
    }
    onChangeWeight(event) {
        this.setState({
            weight: event.target.value
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
            notes: this.state.notes,
            weight: this.state.weight,
            date: this.state.date
        }

        axios.post(root + "/habits/add", habit)
            .then(res => console.log(res.data));

        window.location = "/dashboard";
    }

    render() {
        return (
            
            <div>
                <h1>Log a Habit</h1>
                <div className="row"></div>
                    <div className="col-sm-8 mx-auto">
                        <form onSubmit={this.onSubmit} className="text-left add-habit-form">

                            <div className="userform-group d-none grid-span-2 mx-auto">
                                <label>User: </label>
                                <input
                                    type="text"
                                    required
                                    className="form-control"
                                    defaultValue={this.state.user}
                                />
                            </div>

                            <div>
                                <label>Type: </label>
                                <select ref={this.textInput}
                                    required
                                    className="form-control"
                                    id="input-type"
                                    value={this.state.type}
                                    onChange={this.onChangeType}>
                                    {
                                        this.state.typesArray.map(function (type) {
                                            return (
                                                <option
                                                    key={type}
                                                    value={type}>
                                                    {type}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div>
                                <label>Habit: </label>
                                <select ref={this.textInput}
                                    required
                                    className="form-control"
                                    id="input-habit"
                                    value={this.state.habitName}
                                    onChange={this.onChangeHabitName}>
                                    {
                                        this.state.exerciseArray.map(function (exercise) {
                                            return (
                                                <option
                                                    key={exercise}
                                                    value={exercise}>
                                                    {exercise}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div>
                                <label>Duration: </label>
                                <input
                                    type="number"
                                    required
                                    className="form-control"
                                    id="input-duration"
                                    value={this.state.duration}
                                    onChange={this.onChangeDuration}
                                />
                            </div>

                            <div>
                                <label>Units: </label>
                                <select ref={this.textInput}
                                    required
                                    className="form-control"
                                    id="input-units"
                                    value={this.state.durUnits}
                                    onChange={this.onChangeDurUnits}>
                                    {
                                        this.state.units.map(function (unit) {
                                            return (
                                                <option
                                                    key={unit}
                                                    value={unit}>
                                                    {unit}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div>
                                <label>Weight: </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="input-weight"
                                    value={this.state.weight}
                                    onChange={this.onChangeWeight}
                                />
                            </div>

                            <div className="grid-span-2">
                                <label>Notes: </label>
                                <textarea
                                    className="form-control"
                                    id="input-notes"
                                    value={this.state.notes}
                                    onChange={this.onChangeNotes}
                                ></textarea>
                            </div>

                            <div className="grid-span-2 v-align-center mx-auto">
                                <label className="mr-2">Date: </label>
                                <DatePicker
                                    className="form-control"
                                    id="input-date"
                                    selected={this.state.date}
                                    onChange={this.onChangeDate}
                                />
                            </div>

                            <div className="form-group grid-span-2 mx-auto">
                                <input
                                    type="submit"
                                    value="Add Habit"
                                    className="btn btn-primary"
                                />
                            </div>
                        </form>
                    </div>
            </div>
        )
    }
}


export default CreateHabit;