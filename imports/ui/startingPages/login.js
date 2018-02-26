import React from "react";
import {Link} from "react-router-dom";
import Signup from "./../startingPages/signup";
import {Accounts} from "meteor/accounts-base";
import {Meteor} from "meteor/meteor";
import {history} from "../routes/routes";
import TitleBar from '../generic/titlebar';



export default class Login extends React.Component {

    componentWillMount() {
        if (Meteor.userId()) {
            history.replace('/profile');
        }

    }

    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };

    }

    onSubmit(e) {

        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
        Meteor.loginWithPassword({email}, password, (err) => {
            if (err) {
                this.setState({error: err.reason});
            } else {
                this.setState({error: ""});

            }
        });


    }

    render() {

        return (
            <div>
                <TitleBar title="Login to Paperless"/>
                {this.state.error ? <p>{this.state.error}</p> : undefined}
                <form onSubmit={this.onSubmit.bind(this)} noValidate>
                    <input type="email" name="email" ref="email" placeholder="Email"/>
                    <input type="password" name="password" ref="password" placeholder="Password"/>
                    <button>Login</button>
                </form>
                <Link to="/signup">
                    Sign up to Paperless
                </Link>
            </div>

        );
    }
}