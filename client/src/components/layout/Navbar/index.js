import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {

    render() {
        return (
            <nav class="navbar navbar-expand-md navbar-light bg-light position-fixed w-100">
                <Link to="/" class="navbar-brand">Stick With It</Link>
                
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <Link to="/" class="nav-link">Dashboard</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/habit-list" class="nav-link">Habits</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/create" class="nav-link">Create Habit</Link>
                        </li>                        
                        <li class="nav-item">
                            <Link to="/edit/:id" class="nav-link">Edit Habit</Link>
                        </li>                        
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;