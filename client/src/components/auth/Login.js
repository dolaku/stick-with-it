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
            <div className="container text-center d-flex flex-column justify-content-center align-items-center">
                <h4 className="my-3">Login with Google</h4>

                {
                    this.state.isSignedIn ? (
                        <div>
                            <h5>Signed In!</h5>
                            <p>Hello, {this.state.firstName}</p>
                            <img className="userPhoto" src={this.state.imageURL} />
                            <GoogleLogout
                                buttonText="Logout"
                                onClick={logout}
                                >
                            </GoogleLogout>
                        </div>
                    ) : (
                        <div>
                            <GoogleLogin
                                className="my-4 login-btn"
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