import TitleBar from '../generic/titlebar';
import React from 'react'
import Table from '../generic/table'
import ReactAutocomplete from 'react-autocomplete';
import {Items} from './../../api/items'
import {Meteor} from 'meteor/meteor'
import {Temps} from './../../api/temps'
import {StockTakes} from "../../api/stocktakes";
import TextInput from 'react-autocomplete-input';
import {history} from "../routes/routes";


const menuStyle = {
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 5px',
    fontSize: '90%',
    zIndex: '100',
    borderBottom: '1px solid black',
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
    position: 'fixed',
    overflow: 'auto',
    maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
}
let value = ''
export default class Stocktakes extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            _id: ''
        }

    }

    fetchItems() {
        return Items.find({User: Meteor.userId()}).fetch().map((item) => {
            return item.ItemName;
        });
    }

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
                    <button onClick={() => {
                        let itemID = dat._id;
                        if (itemID) {
                            Temps.remove(itemID);
                        }
                    }

                    }>X</button>
            }
        });

        return {
            data: data,
            columns: columns
        }
    };

    handleSubmit(e) {
        e.preventDefault();
        // let item = document.getElementsByName("textinput");
        // console.log(e.target.textinput.attributes[0].value);

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
        e.target.textinput.value="";

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


    render() {
        return (
            <div className="container">
                <TitleBar title="Stocktakes" mainData="Items: 0"/>
                <div className='formstyle'>

                    <div className="controllerwrap">
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <TextInput Component="input"  placeholder="Item's name" name="textinput" options={this.fetchItems()} trigger={""} maxOptions="4" defaultValue={""}/>
                            <input type="number" min="0" step="any" name="ItemQuantity" placeholder="Quantity"/>
                            <input className="button_controller " type="image" name="" src="./../../../img/AddItem.svg" border="0"   />
                            <img className="button_controller button_disabled" type="image" name="submit" src="./../../../img/Add.svg" border="0" alt="Submit" onClick={()=>alert("Button Disabled")} />
                            <input className="button_controller " type="image" name="save" src="./../../../img/Save.svg" border="0" alt="" onClick={(e)=>{
                                e.preventDefault();
                                this.saveStocktakes()}} />
                        </form>

                    </div>
                </div>

                <button onClick={
                    (e)=>{
                        e.preventDefault();
                        history.push("/stocktakeslist");
                    }
                }> <i className="fa fa-arrow-circle-left"></i></button>
                <div>

                </div>
                <Table data={this.fetch().data} columns={this.fetch().columns}/>
            </div>)
    }
}