import React, { Component } from "react";
import axios from "axios";
import "./style.css";

import GoogleLogin from "react-google-login";
import GoogleLogout from 'react-google-login';

const root = "http://localhost:5000";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSignedIn: false,
            name: "",
            firstName: "",
            email: "",
            photo: ""
        }
    }

    render() {

       
        const login = (res) => {
            
            this.setState({
                isSignedIn: true,
                firstName: res.profileObj.givenName,
                name: res.profileObj.name,
                email: res.profileObj.email,
                photo: res.profileObj.imageUrl
            })
            
            const user = {
                name: this.state.name,
                email: this.state.email,
                photo: this.state.photo
            }

            axios.get(root + "/users/")
                .then((res) => {
                    const allUsers = res.data;
                    let emailsArray = [];

                    allUsers.forEach(element => {
                        emailsArray.push(element.email);
                    });

                    // check if user is already saved in db
                    if (!emailsArray.includes(this.state.email)) {
                        axios.post(root + "/users/add", user)
                            .then(() => console.log(user));
                    }
                })
        }

        const logout = () => {
            this.setState({
                isSignedIn: false,
                name: "",
                firstName: "",
                email: "",
                photo: ""
            })
        }



        return (
            <div>
                {
                    this.state.isSignedIn ? (
                        <div className="login-wrapper">
                            <span id="user-greeting" data-user={this.state.email}>Hi, {this.state.firstName}<img className="userPhoto" src={this.state.photo} alt="user"  /></span>
                            <GoogleLogout
                                className="logout-btn"
                                buttonText="Logout"
                                onSuccess={logout}
                            />
                        </div>
                    ) : (
                        <div className="login-wrapper">
                            <GoogleLogin
                                clientId="110658189417-fkks5fvfoco7hecsp4ijidhfn3ktu0o2.apps.googleusercontent.com"
                                buttonText="LOGIN"
                                onSuccess={login}
                                onFailure={login}
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Login;