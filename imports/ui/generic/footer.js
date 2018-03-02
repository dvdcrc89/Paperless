import React from 'react'
import ReactDOM from 'react-dom'
import propTypes from 'prop-types'
import {history} from "../routes/routes";
import {Accounts} from "meteor/accounts-base";
import {Meteor} from 'meteor/meteor'

export default class Footer extends React.Component {

    returnDate(){
        var date = new Date()
        var begun = moment(date).format("DD MMMM YYYY");
        return begun;
    }


    render() {
        return (
            <div className={"footer_fixed"}>
                <div className={"black_wrapper"}>


                    <div className={"footer_buttons"}>
                        <div className={"logout"}>
                            <input className="button_controller foot " type="image" name="logout"
                                   src="./../../../img/logout.svg" border="0" onClick={
                                (e) => {
                                    e.preventDefault();
                                    Accounts.logout();
                                }
                            }/>
                        </div>
                        <div className={"nav_button"}>
                    <input className="button_controller foot space" type="image" name="stocktake"
                           src="./../../../img/stocktake.svg" border="0" onClick={
                        (e) => {
                            e.preventDefault();
                            history.push("/stocktakes");
                        }
                    }/>
                    <input className="button_controller foot space"  type="image" name="menu"
                           src="./../../../img/menu.svg" border="0" onClick={
                        (e) => {
                            e.preventDefault();
                            history.push("/recipelist");
                        }
                    }/>
                    <input className="button_controller foot space" type="image" name="recipe"
                           src="./../../../img/recipe.svg" border="0" onClick={
                        (e) => {
                            e.preventDefault();
                            history.push("/recipe");
                        }
                    }/>
                     <input className="button_controller foot space" type="image" name="stock"
                           src="./../../../img/stock.svg" border="0" onClick={
                        (e) => {
                            e.preventDefault();
                            history.push("/stock");
                       }
                    }/>
                        </div>
                    </div>
                </div>
                
                <div className={"showData"}>
                    <h1>{this.props.title}</h1>
                    <h2>{this.returnDate()}</h2>

                </div>
                </div>
         
        )
    }
}