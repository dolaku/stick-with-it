import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./style.css";
import auth from "./Auth";

class Public extends Component {
    
    state = {
        redirectToReferrer: false
    }

    login() {
        auth.authenticated(() => {
            this.setState({
                redirectToReferrer: true
            })
        })
    }
    
    render() {
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return (
                <Redirect to="/dashboard" />
            )
        }

        return (
            <div className="mt-5 mx-3 text-center">
                <h1>Sign in with Google to trach your progress.</h1>
            </div>
        );
    }
}

export default Public;