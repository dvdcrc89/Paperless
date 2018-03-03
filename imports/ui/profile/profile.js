import TitleBar from '../generic/titlebar';
import React from 'react'
import Table from '../generic/table'
import {Accounts} from "meteor/accounts-base";
import {history} from "../routes/routes";
import {Meteor} from 'meteor/meteor';
import Footer from './../generic/footer'

export default class Profile extends React.Component {

        getUser(){
            if(Meteor.user()) {
                return Meteor.user().emails[0].address;
            }
        }

        render()
        {
            return (
                <div className="container">

                    <TitleBar title="Profile" mainData={this.getUser()}/>

                    <div className="profile_grid">
                        <div className="menu_g">
                            <img src="./../../../img/menu.svg"></img>
                        </div>
                        <div className="stock_g">
                            <img src="./../../../img/stock.svg"></img>
                        </div>
                        <div className="stocktake_g">
                            <img src="./../../../img/stocktake.svg"></img>
                        </div>
                        <div className="temperature_g">
                            <img src="./../../../img/recipe.svg"></img>
                        </div>
                    </div>


                    {/*<Table/>*/}
                    <Footer/>
                </div>)
        }
    }
