import React, { Component } from "react";
import { Link } from "react-router-dom";
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
            habitID: "",

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
        let getID = window.location.href;
        getID = getID.substring(41, 66);
        this.setState({ habitID: getID });

        axios.get(root + "/habits/" + this.state.habitID)
            .then(res => {
                console.log(res.data);

                res.data.map(item => {
                    if (item._id === this.state.habitID) {
                        console.log(item);
                        this.setState({
                            user: item.user,
                            habitName: item.habitName,
                            type: item.type,
                            duration: item.duration,
                            durUnits: item.durUnits,
                            notes: item.notes,
                            weight: item.weight,
                            date: parseISO(item.date)
                        })
                    }
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

        axios.post(root + "/habits/update/" + this.state.habitID, habit)
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
                                id="input-habit"
                                className="form-control"
                                value={this.state.habitName}
                            />
                        </div>

                        <div>
                            <label>Type: </label>
                            <input
                                disabled
                                type="text"
                                required
                                id="input-type"
                                className="form-control"
                                value={this.state.type}
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
                                data-toggle="modal"
                                data-target="#redirectModal"
                            />
                        </div>
                    </form>
                </div>

                {/* Modal */}
                <div class="modal fade" id="redirectModal" tabindex="-1" role="dialog" aria-labelledby="linkDashboard" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title" id="linkDashboard">Success!</h3>
                                <Link to="/" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </Link>
                            </div>
                            <div class="modal-body">
                                This habit log has been updated.
                            </div>
                            <div class="modal-footer">
                                <Link to="/" class="btn btn-secondary" data-dismiss="modal">Return to Dashboard</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default EditHabit;