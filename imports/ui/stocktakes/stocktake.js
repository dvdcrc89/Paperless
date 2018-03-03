import TitleBar from '../generic/titlebar';
import React from 'react'
import Table from '../generic/table'
import {Items} from './../../api/items'
import {Meteor} from 'meteor/meteor'
import {Temps} from './../../api/temps'
import {StockTakes} from "../../api/stocktakes";
import TextInput from 'react-autocomplete-input';
import {history} from "../routes/routes";
import Footer from './../generic/footer'


export default class Stocktakes extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            _id: ''
        }

    }


    /*                                                           **
     *                        Table Declaration                  **
     *                                                            */

    fetch() {
        const columns = [
            {
                Header: 'Ingredient Name', accessor: 'ItemName'
            }, {
                Header: 'Quantity', accessor: 'ItemQuantity', width: 90

            }, {
                Header: 'Value', accessor: 'ItemValue', width: 90

            }, {
                Header: '', accessor: 'btn', width: 50
            }]

        const data = Temps.find({User: Meteor.userId()}).fetch().map((dat) => {
            return {
                ItemName: dat.ItemName,
                ItemQuantity: dat.ItemQuantity + " " + dat.ItemMeasure,
                ItemValue: dat.ItemValue + "£",
                btn:
                    <i className="fa fa-trash" onClick={() => {
                        let itemID = dat._id;
                        if (itemID) {
                            Temps.remove(itemID);
                        }
                    }

                    }></i>
            }
        });

        return {
            data: data,
            columns: columns
        }
    };


    /*                                                      **
    *               Add, Open new Tab, Save Functions       **
    *                                                       **
    *                                                        */


    handleSubmit(e) {
        e.preventDefault();
        let itemName = e.target.textinput.value.trim();
        let itemId = ""
        try {
            itemId = Items.find({User: Meteor.userId(), ItemName: itemName}).fetch()[0]._id;
        } catch (e) {
            alert("Item not in stock")
            return
        }
        let itemQuantity = e.target.ItemQuantity.value;
        e.preventDefault();

        if (Temps.find({IngredientId: itemId}).fetch().length > 0) {
            alert("Item already in");
            return
        }
        let ingredient = Items.find({User: Meteor.userId(), ItemName: itemName}).fetch();
        let measure = ingredient[0].ItemUnitMeasure;
        let value = itemQuantity / ingredient[0].ItemQuantity * ingredient[0].ItemPrice;
        Temps.insert({
            User: Meteor.userId(),
            ItemName: itemName,
            ItemQuantity: itemQuantity,
            ItemMeasure: measure,
            IngredientId: itemId,
            ItemValue: Math.round(value * 100) / 100

        });
        e.target.textinput.value = "";

    }


    saveStocktakes() {
        let date = new Date()
        let begun = moment(date).format("DD MMMM YYYY");
        let notes = prompt("Feel free to add some notes");
        let stocktake = Temps.find({User: Meteor.userId()}).fetch()
        let value = 0;
        value = stocktake.map((item) => {
            return value += item.ItemValue;
        })
        console.log(value)
        StockTakes.insert({
            User: Meteor.userId(),
            Date: begun,
            Note: notes,
            TotalValue: Math.round(value[value.length - 1] * 100) / 100,
            STitems: stocktake

        })
        Temps.find({User: Meteor.userId}).fetch().map((temp) => {
            Temps.remove({_id: temp._id})
        })
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
        return (
            <div className={"controller_bar"}>
                <input className="button_controller " type="image" name="back"
                src="./../../../img/back.svg" border="0" onClick={()=>{
                    history.push("/stocktakeslist")
                }}/>
                <div className={"controller"}>
                    <form id="add_item" onSubmit={this.handleSubmit.bind(this)}>
                        <TextInput Component="input" placeholder="Item's name" name="textinput"
                                   options={this.fetchItems()} trigger={""} maxOptions="4" defaultValue={""}/>
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


                <Table data={this.fetch().data} columns={this.fetch().columns}/>
                <Footer title={"New stocktake"}/>
            </div>)
    }
}