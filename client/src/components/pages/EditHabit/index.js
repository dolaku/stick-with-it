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

            showWeight: false,
        }
    }

    // a React lifecycle method - auto executed
    // loads this block right before anything renders to the page
    componentDidMount() {
        axios.get(root + "/habits/" + this.props.match.params.id)
            .then(res => {
                console.log(res);
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
    }

    render() {
        return (
            <div>
                <h1>Edit a Habit Log</h1>
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
                            <input
                                disabled
                                type="text"
                                required
                                className="form-control"
                                value={ this.state.habitName }
                            />
                        </div>

                        <div>
                            <label>Type: </label>
                            <input
                                disabled
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
                                value="Update"
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