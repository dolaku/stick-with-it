import React, { Component } from "react";
import "./style.css";

import GoogleLogin from "react-google-login";
import GoogleLogout from 'react-google-login';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSignedIn: false,
            name: "",
            firstName: "",
            email: "",
            imageURL: ""
        }
    }

    render() {

       
        const resGoogle = (res) => {
            this.setState({
                isSignedIn: true,
                name: res.profileObj.name,
                firstName: res.profileObj.givenName,
                email: res.profileObj.email,
                imageURL: res.profileObj.imageUrl
            })
            console.log(this.state.isSignedIn);
        }

        const logout = () => {
            this.setState({
                isSignedIn: false,
                name: "",
                firstName: "",
                email: "",
                imageURL: ""
            })
            console.log(this.state.isSignedIn);
        }



        return (
            <div>
                {
                    this.state.isSignedIn ? (
                        <div className="login-wrapper">
                            <span className="mb-2 user-greeting">Hello, {this.state.firstName}<img className="userPhoto" src={this.state.imageURL} alt="user" /></span>
                            <GoogleLogout
                                className="logout-btn"
                                buttonText="Logout"
                                onSuccess={logout}
                                >
                            </GoogleLogout>
                        </div>
                    ) : (
                        <div className="login-wrapper">
                            <GoogleLogin
                                clientId="110658189417-fkks5fvfoco7hecsp4ijidhfn3ktu0o2.apps.googleusercontent.com"
                                buttonText="LOGIN"
                                onSuccess={resGoogle}
                                onFailure={resGoogle}
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Login;