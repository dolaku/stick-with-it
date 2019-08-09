import React, { Component } from "react";
import axios from "axios";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const root = "https://stick-with-it.herokuapp.com";

class EditHabit extends Component {

    constructor(props) {
        super(props);
        this.textInput = React.createRef();

        this.onChangehabitName = this.onChangehabitName.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDurUnits = this.onChangeDurUnits.bind(this);
        this.onChangeNotes = this.onChangeNotes.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            user: "",
            habitName: "",
            type: "",
            duration: 10,
            durUnits: "",
            notes: "",
            date: new Date(),

            units: ["Min", "Times"],
            typesArray: ["Exercise", "Health", "Study", "Work"],

            showWeight: false,

            exerciseOptions: [
                { value: "Bicycling", label: "Bicycling" },
                { value: "Climbing", label: "Climbing" },
                { value: "Dancing", label: "Dancing" },
                { value: "Hiking", label: "Hiking" },
                { value: "Running", label: "Running" },
                { value: "Sports", label: "Sports" },
                { value: "Stretching", label: "Stretching" },
                { value: "Walking", label: "Walking" },
                { value: "Weight Lifting", label: "Weight Lifting" },
                { value: "Yoga", label: "Yoga" },
                { value: "Other Exercise", label: "Other Exercise" }
            ],
            healthOptions: [
                { value: "Checkups", label: "Checkups" },
                { value: "Meditate", label: "Meditate" },
                { value: "Sleep", label: "Sleep" },
                { value: "Track Weight", label: "Track Weight" },
                { value: "Other Health", label: "Other Health" }
            ],
            studyOptions: [
                { value: "Coding", label: "Coding" },
                { value: "Prepare for Exam", label: "Prepare for Exam" },
                { value: "Read a Book", label: "Read a Book" },
                { value: "Review/Practice", label: "Review/Practice" },
                { value: "Other Study", label: "Other Study" }
            ],
            workOptions: [
                { value: "Apply for a New Job", label: "Apply for a New Job" },
                { value: "Networking", label: "Networking" },
                { value: "Organize Computer Files", label: "Organize Computer Files" },
                { value: "Organize Workspace", label: "Organize Workspace" },
                { value: "Plan the Day", label: "Plan the Day" },
                { value: "Other Work", label: "Other Work" }
            ]
        }
    }

    // a React lifecycle method - auto executed
    // loads this block right before anything renders to the page
    componentDidMount() {
        axios.get(root + "/habits/" + this.props.match.params.id)
            .then(res => {
                this.setState({
                    user: res.data.user,
                    habitName: res.data.habitName,
                    type: res.data.type,
                    duration: res.data.duration,
                    durUnits: res.data.durUnits,
                    notes: res.data.notes,
                    weight: res.data.weight,
                    date: new Date(res.data.date)
                })
            })
            .catch(err => console.log(err));
    }

    // methods to set values
    onChangeHabitName(event) {
        this.setState({
            habitName: event.target.value
        });
        
        switch (event.target.value) {
            case "Bicycling":
            case "Climbing":
            case "Dancing":
            case "Hiking":
            case "Running":
            case "Sports":
            case "Stretching":
            case "Walking":
            case "Weight Lifting":
            case "Yoga":
            case "Other Exercise":
                this.setState({ type: "Exercise"})
                break;
            case "Checkups":
            case "Meditate":
            case "Sleep":
            case "Track Weight":
            case "Other Health":
                this.setState({ type: "Health"})
                break;
            case "Coding":
            case "Prepare for Exam":
            case "Read a Book":
            case "Review/Practice":
            case "Other Study":
                this.setState({ type: "Study"})
                break;
            case "Apply for a New Job":
            case "Networking":
            case "Organize Computer Files":
            case "Organize Workspace":
            case "Plan the Day":
            case "Other Work":
                this.setState({ type: "Work"})
                break;
            default:
        }

        if (event.target.value === "Track Weight") {
            this.setState({ showWeight: true });
        } else {
            
            this.setState({ showWeight: false });
        }
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

        axios.post(root + "/habits/update/" + this.props.match.params.id, habit)
            .then(res => console.log(res.data));

        window.location = "/dashboard";
    }

    render() {
        return (
            <div>
                <h1>Log a Habit</h1>
                <div className="row"></div>
                <div className="col-sm-8 mx-auto">
                    <form onSubmit={this.onSubmit} className="text-left add-habit-form" novalidate>

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
                            <label>Habit: </label>
                            <select ref={this.textInput}
                                required
                                className="form-control"
                                id="input-habit"
                                value={this.state.habitName}
                                onChange={this.onChangeHabitName}>
                                <option>Select One</option>
                                <option disabled>--EXERCISE--</option>
                                {
                                    this.state.exerciseOptions.map(function (item) {
                                        return (
                                            <option
                                                data-type="Exercise"
                                                key={item.value}
                                                value={item.value}>
                                                {item.value}
                                            </option>
                                        )
                                    })
                                }
                                <option disabled>--HEALTH--</option>
                                {
                                    this.state.healthOptions.map(function (item) {
                                        return (
                                            <option
                                            data-type="Health"
                                                key={item.value}
                                                value={item.value}>
                                                {item.value}
                                            </option>
                                        )
                                    })
                                }
                                <option disabled>--STUDY--</option>
                                {
                                    this.state.studyOptions.map(function (item) {
                                        return (
                                            <option
                                            data-type="Study"
                                                key={item.value}
                                                value={item.value}>
                                                {item.value}
                                            </option>
                                        )
                                    })
                                }
                                <option disabled>--WORK--</option>
                                {
                                    this.state.workOptions.map(function (item) {
                                        return (
                                            <option
                                            data-type="Work"
                                                key={item.value}
                                                value={item.value}>
                                                {item.value}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div>
                            <label>Type: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={ this.state.type }
                            />
                        </div>

                        <div>
                            <label>Duration or Frequency: </label>
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

                        <div className={
                            !this.state.showWeight ? "d-none" : null
                        }>
                            <label>Weight (lbs): </label>
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


export default EditHabit;