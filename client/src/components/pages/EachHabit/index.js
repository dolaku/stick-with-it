import React from "react";
import { Link } from "react-router-dom";

// functional React component
const EachHabit = props => (
    <tr>
        <td>{props.habit.user}</td>
        <td>{props.habit.habitName}</td>
        <td>{props.habit.type}</td>
        <td>{props.habit.duration} {props.habit.durUnits}</td>
        <td>{props.habit.sets} sets of {props.habit.reps}</td>
        <td>{props.habit.notes}</td>
        <td>{props.habit.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.habit._id}>edit</Link> | 
            <button onClick={ () => props.deleteHabit(props.habit._id) } type="button" className="btn btn-danger">delete</button>
        </td>
    </tr>
)

export default EachHabit;