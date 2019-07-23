import React, { Component } from "react";
import "./style.css";

import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

class Login extends Component {

    render() {

        const responseFacebook = (response) => {
            console.log(response);
        }

        const responseGoogle = (response) => {
            console.log(response);
        }

        return (
            <div className="container text-center d-flex flex-column justify-content-center align-items-center">
                <h1 className="my-5">Login with Facebook or Google</h1>

                <FacebookLogin
                    className="my-5"
                    appId="" //APP ID NOT CREATED YET
                    fields="name,email,picture"
                    callback={responseFacebook}
                />

                <GoogleLogin
                    className="my-5"
                    clientId="110658189417-fkks5fvfoco7hecsp4ijidhfn3ktu0o2.apps.googleusercontent.com"
                    buttonText="LOGIN WITH GOOGLE"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                />

            </div>
        );
    }
}

export default Login;