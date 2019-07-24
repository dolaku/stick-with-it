import React, { Component } from "react";
import "./style.css";

import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

class Login extends Component {

    render() {

        const resFacebook = (res) => {
            console.log(res);
            console.log(res.name);
            console.log(res.email);
            console.log(res.picture.data.url);
        }

        const resGoogle = (res) => {
            console.log(res.profileObj);
            console.log(res.profileObj.name);
            console.log(res.profileObj.email);
            console.log(res.profileObj.imageUrl);
        }

        return (
            <div className="container text-center d-flex flex-column justify-content-center align-items-center">
                <h4 className="my-3">Login with Facebook or Google</h4>
                
                <div className="container text-center d-flex flex-wrap justify-content-center align-items-center">
                    <FacebookLogin
                        className="my-4 mx-3 login-btn"
                        appId="486572865409816"
                        fields="name,email,picture"
                        callback={resFacebook}
                    />

                    <GoogleLogin
                        className="my-4 mx-3 login-btn"
                        clientId="110658189417-fkks5fvfoco7hecsp4ijidhfn3ktu0o2.apps.googleusercontent.com"
                        buttonText="LOGIN WITH GOOGLE"
                        onSuccess={resGoogle}
                        onFailure={resGoogle}
                    />
                </div>
            </div>
        );
    }
}

export default Login;