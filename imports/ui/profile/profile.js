import TitleBar from '../generic/titlebar';
import React from 'react'
import Table from '../generic/table'
import {Accounts} from "meteor/accounts-base";
import {history} from "../routes/routes";
import {Meteor} from 'meteor/meteor';
import Footer from './../generic/footer'
import {Recipes} from "../../api/recipes";
import {StockTakes} from "../../api/stocktakes";

export default class Profile extends React.Component {

        getUser(){
            if(Meteor.user()) {
                return Meteor.user().emails[0].address;
            }
        }

    renderInfo(par) {
        let stocktakelength= StockTakes.find({User: Meteor.userId()}).fetch().length;
        let menulength = Recipes.find({User: Meteor.userId()}).fetch().length;
        if(menulength>0){
        let lastrecipe = Recipes.find({User: Meteor.userId()}).fetch()[menulength - 1].RecipeName;
        let lastStockvalue= StockTakes.find({User: Meteor.userId()}).fetch()[stocktakelength-1].TotalValue;
            switch (par) {

                case "menu": {
                    return (
                        <div className={"info"}>
                            <div className="title_g"><h1>Menu</h1></div>
                            <p>Total recipe: {menulength}</p>
                            <p>Last recipe added:</p> <p>{lastrecipe}</p>
                        </div>
                    )

                }
                case "stocktake" :{
                    return (
                        <div className={"info"}>
                            <div className="title_g"><h1>Stocktake</h1></div>
                            <p>Total stocktakes: {stocktakelength}</p>
                            <p>Last stocktake value: {lastStockvalue}£</p>
                        </div>
                    )


                }
            }
        }}

    renderButtons_Controller() {
        return (
            <div className={"controller_bar"}>
                <div className={"controller"}></div>
                <div className={"buttons"}>
                    <input className="button_controller button_disabled " type="image" name="addItem"
                           src="./../../../img/AddItem.svg" border="0" onClick={() => alert("Button Disabled")}/>
                    <input className="button_controller button_disabled" type="image" name="newTable"
                           src="./../../../img/Add.svg" border="0" alt="Submit"
                           onClick={() => alert("Button Disabled")}/>
                    <input className="button_controller button_disabled" type="image" name="save"
                           src="./../../../img/Save.svg" border="0" alt="" onClick={() => alert("Button Disabled")}/>
                </div>
            </div>)
    }

        render()
        {
            return (
                <div className="container">

                    <TitleBar title="Profile" mainData={this.getUser()}/>
                    <div className={"black_wrapper"}>
                        {this.renderButtons_Controller()}
                    </div>
                    <div className="profile_grid">
                        <div className="menu_g">
                            <div className="img_g">
                                <img src="./../../../img/menu.svg"></img>
                            </div>
                            {this.renderInfo("menu")}
                        </div>
                        <div className="stock_g">
                            <div className="img_g">
                                <img src="./../../../img/stock.svg"></img>
                            </div>
                            {this.renderInfo("stocktake")}
                        </div>
                        <div className="stocktake_g">
                            <div className="img_g">
                            <img src="./../../../img/stocktake.svg"></img>
                            </div>
                            {this.renderInfo("stocktake")}
                        </div>
                        <div className="temperature_g">
                            <div className="img_g">
                            <img src="./../../../img/recipe.svg"></img>
                            </div>
                            {this.renderInfo("stocktake")}
                        </div>
                    </div>


                    {/*<Table/>*/}
                    <Footer/>
                </div>)
        }
    }
