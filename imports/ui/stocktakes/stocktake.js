import TitleBar from '../generic/titlebar';
import React from 'react'
import StocktakeTable from './stocktakeTable'
import {Items} from './../../api/items'
import {Meteor} from 'meteor/meteor'
import {Temps} from './../../api/temps'
import {StockTakes} from "../../api/stocktakes";
import TextInput from 'react-autocomplete-input';
import {history} from "../routes/routes";
import Footer from './../generic/footer'
import {Tracker} from "meteor/tracker";


export default class Stocktakes extends React.Component {

    constructor(props){
        super(props);
        this.state={
            temps: [],
            items:[]
        }
    }

    componentDidMount(){
        this.stocktakeTracker= Tracker.autorun(()=>{
            Meteor.subscribe('temps');
            const temps =Temps.find().fetch();
            this.setState({temps});
            Meteor.subscribe("items");
            const items=Items.find().fetch().map((item) => {
                return item.itemName;
            });
            this.setState({items});


        });

    }

    componentWillUnmount(){
        this.stocktakeTracker.stop();
    }




    /*                                                      **
    *               Add, Open new Tab, Save Functions       **
    *                                                       **
    *                                                        */


    handleSubmit(e) {
        e.preventDefault();
        let itemName = e.target.textinput.value.trim();
        let itemId = ""

        try {
            itemId = Items.findOne({itemName: itemName})._id;
        } catch (e) {
            alert("Item not in stock")
            return
        }
        let itemQuantity = e.target.ItemQuantity.value;

        if (Temps.find({ingredientId: itemId}).fetch().length > 0) {
            alert("Item already in");
            return
        }
        let ingredient = Items.findOne({itemName: itemName});
        let measure = ingredient.itemUnitMeasure;
        let value = itemQuantity / ingredient.itemQuantity * ingredient.itemPrice;
        Meteor.call("temps.insert",itemName,itemQuantity,measure,itemId,value);

        e.target.textinput.value = "";

    }


    saveStocktakes() {
        let date = new Date()
        let begun = moment(date).format("DD MMMM YYYY");
        let notes = prompt("Feel free to add some notes");
        let value = 0;
        value = this.state.temps.map((item) => {
            return value += item.ItemValue;
        })
        console.log(value)
        Meteor.call("stocktakes.insert",begun,notes,value,this.state.temps);
        // StockTakes.insert({
        //     User: Meteor.userId(),
        //     Date: begun,
        //     Note: notes,
        //     TotalValue: Math.round(value[value.length - 1] * 100) / 100,
        //     STitems: stocktake
        //
        // })
        Meteor.call("temps.drop");
        history.push("/stocktakeslist");
    }


    /*                                      **
    *               Other functions         **
    *                                       **
    *                                       */

    fetchItems() {
        return Items.find({User: Meteor.userId()}).fetch().map((item) => {
            return item.ItemName;
        });
    }


    /*                                                              **
    *               Add, Open new Tab, Save Buttons                 **
    *                        & Controller                           **
    *                                                               */

    renderButtons_Controller() {
        Meteor.subscribe("temps");
        return (
            <div className={"controller_bar"}>
                <input className="button_controller " type="image" name="back"
                src="./../../../img/back.svg" border="0" onClick={()=>{
                    history.push("/stocktakeslist")
                }}/>
                <div className={"controller"}>
                    <form id="add_item" onSubmit={this.handleSubmit.bind(this)}>
                        <TextInput Component="input" placeholder="Item's name" name="textinput"
                                   options={this.state.items} trigger={""} maxOptions="4" defaultValue={""}/>
                        <input type="number" min="0" step="any" name="ItemQuantity" placeholder="Quantity"/>
                    </form>
                </div>
                <div className={"buttons"}>
                    <input className="button_controller " type="image" name="addItem" form={"add_item"}
                           src="./../../../img/AddItem.svg" border="0"/>
                    <input className="button_controller button_disabled" type="image" name="newTable"
                           src="./../../../img/Add.svg" border="0" alt="Submit"
                           onClick={() => alert("Button Disabled")}/>
                    <input className="button_controller" type="image" name="save"
                           src="./../../../img/Save.svg" border="0" alt="" onClick={(e) => {
                        e.preventDefault();
                        this.saveStocktakes();
                    }}/>
                </div>

            </div>
        )
    }

    /*                                  **
    *               JSX Render          **
    *                                   **
    *                                   */

    render() {
        return (
            <div className="container">
                <TitleBar title="Stocktakes" mainData="Items: 0"/>
                <div className={"black_wrapper"}>
                {this.renderButtons_Controller()}
                </div>


                <StocktakeTable/>
                <Footer title={"New stocktake"}/>
            </div>)
    }
}