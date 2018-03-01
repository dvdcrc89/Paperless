import React from 'react'
import ReactDOM from 'react-dom'
import propTypes from 'prop-types'
import {history} from "../routes/routes";
import {Accounts} from "meteor/accounts-base";

export default class TitleBar extends React.Component{


    returnDate(){
        var date = new Date()
        var begun = moment(date).format("DD MMMM YYYY");
        return begun;
    }
    renderNav(){
        if(!!Meteor.userId()){
            return(
                <div className="navbar">
                    <div className="navbarcontainer">

                        <div className="dropdown">
                            <h3 className="dropbtn">
                                <i className="fa fa-sticky-note"></i>
                            </h3>
                            <div className="dropdown-content">
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    history.push('/stock');
                                }}>Stock</a>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    history.push('/stocktakeslist');
                                }}>Stock take</a>
                            </div>
                        </div>
                        <div className="dropdown">
                            <h3 className="dropbtn">

                                <i className="fa fa-bars"></i>
                            </h3>
                            <div className="dropdown-content">
                                <a href="#">Recipes</a>
                                <a href="#">Menu</a>
                            </div>
                        </div>
                        <div className="dropdown">
                            <h3 className="dropbtn">
                                <i className="fa fa-paperclip"></i>
                            </h3>
                            <div className="dropdown-content">
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    history.push('/fftemperature');
                                }}>Temperature</a>
                                </div>
                        </div>
                        <div className="dropdown">
                            <h3 className="dropbtn">
                                <i className="fa fa-balance-scale"></i>
                            </h3>
                            <div className="dropdown-content">
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    Accounts.logout();
                                }}>Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }




    render(){
        let date=this.returnDate();

        return(
            <div className="header">
                <div className="titleBar">
                    <img className ="logo" src="/img/logo2.svg"></img>
                <div className = "social">
                    <i className="fa fa-facebook-square"></i>
                    <i className="fa fa-instagram"></i>
                    </div>
                </div>
                {this.renderNav()}
            </div>

        )
    }
}

TitleBar.propTypes = {
    title: propTypes.string.isRequired,
    subtitle: propTypes.string
}