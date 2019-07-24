import React, { Component } from "react";
import { Link } from "react-router-dom";
import './style.css';

class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light position-fixed w-100">
                <Link to="/" className="navbar-brand fancy-font">Stick With It</Link>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/habit-list" className="nav-link">Habits</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/create" className="nav-link">Create Habit</Link>
                        </li>                        
                        <li className="nav-item">
                            <Link to="/edit/:id" className="nav-link">Edit Habit</Link>
                        </li>                        
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>                        
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;