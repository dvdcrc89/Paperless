import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import {Accounts} from "meteor/accounts-base";
import {Meteor} from "meteor/meteor";
import {history} from "../routes/routes";
import TitleBar from "../generic/titlebar";

export default class Signup extends React.Component{
    componentWillMount(){
        if(Meteor.userId()){
            history.replace('/profile');
        }

    }

    constructor(props){
        super(props);
        this.state={
            error:''
        }

    }


    onSubmit(e){
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        if(password.length<6){
            return this.setState({error:"Password must be at least 6 characters"})
        }

        Accounts.createUser({email,password},(err)=>{
            if(err){
                this.setState({error:err.reason});
            } else {
                this.setState({error:""});
                history.replace('/profile');

            }
        });

    }
    render(){

        return (
            <div>
                <TitleBar title="Signup to Paperless"/>
                {this.state.error ? <p>{this.state.error}</p> : undefined}
                <form onSubmit={this.onSubmit.bind(this)} noValidate>
                    <input type="email" name="email" ref="email" placeholder="Email"/>
                    <input type="password" name="password" ref="password" placeholder="Password"/>
                    <button>Create Account</button>
                </form>
                <Link to="/">Go Back</Link>
            </div>
        );
    }
}