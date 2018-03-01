import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import {Accounts} from "meteor/accounts-base";
import {Meteor} from "meteor/meteor";
import {history} from "../routes/routes";
import TitleBar from "../generic/titlebar";

export default class LoginSignup extends React.Component{
    componentWillMount(){
        if(Meteor.userId()){
            history.replace('/profile');
        }

    }

    constructor(props){
        super(props);
        this.state={
            error:'',
            value:"login"
        }

    }

    onSubmit_login(e) {

        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
        Meteor.loginWithPassword({email}, password, (err) => {
            if (err) {
                this.setState({error: err.reason});
            } else {
                this.setState({error: ""});
                history.replace('/profile');


            }
        });


    }
    onSubmit(e){
        e.preventDefault();

        let email = e.target.email.value.trim();
        let password = e.target.password.value.trim();
        console.log(email+"  "+password)
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
    renderLoginSignup(){
        if(this.state.value==="login"){
            return(
                <div class ="sub">
                    <button className={"formButtonSL"} onClick={()=>this.setState({value:"signup"})}>Don't have an account? Sign up</button>

                    <form onSubmit={this.onSubmit_login.bind(this)} noValidate>
                        <input type="email" name="email" ref="email" className="signup_form_style" placeholder="Email"/>
                        <input type="password" name="password" ref="password" className="signup_form_style" placeholder="Password"/>
                        <button className="formButton">Login</button>
                    </form>
                </div>
            )

        } else {
            return(
                <div class ="sub">
                    <button className={"formButtonSL"}onClick={()=>this.setState({value:"login"})}>Already have an account? Log in</button>
                    <form onSubmit={this.onSubmit.bind(this)} noValidate>
                {/*<input type="text" name="name" className="signup_form_style" placeholder="Full Name" required />*/}
                <input type="email" name="email" className="signup_form_style" placeholder="Email" required />
                {/*<input type="" name="" className="signup_form_style" placeholder="Confirm Email" required />*/}
                <input type="password" name="password" className="signup_form_style" placeholder="Password" required />
                <input type="" name="" className="signup_form_style" placeholder="Confirm Password" required />
                <button className="formButton">Sign up</button>
            </form>
                </div>
            )
        }
    }
    render(){

        return (


                <section>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <TitleBar/>
                    <div className="aligner ">
                        <div className="subOne">
                            <div className="claim">
                                <img className="logoClaim" src="./../../../img/logo3.svg"></img>
                            </div>

                        </div>
                            {this.renderLoginSignup()}
                            </div>


                </section>


        );
    }
}