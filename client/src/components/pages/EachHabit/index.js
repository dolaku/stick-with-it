import React from "react";
import { Link } from "react-router-dom";

// functional React component
const EachHabit = props => (
    <tr>
        <td>{props.habit.habitName}</td>
        <td>{props.habit.type}</td>
        <td>{props.habit.duration} {props.habit.durUnits}</td>
        <td>Set: {props.habit.sets}, Reps: {props.habit.reps}</td>
        <td>{props.habit.notes}</td>
        <td>{props.habit.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.habit._id}><i className="fas fa-edit mr-2" alt="edit" title="edit"></i></Link>
            <Link to="" onClick={ () => props.deleteHabit(props.habit._id) } className=""><i className="fas fa-trash" alt="delete" title="delete"></i></Link>
        </td>
    </tr>
)

export default EachHabit;