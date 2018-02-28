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




const menuStyle={
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 5px',
    fontSize: '90%',
    zIndex: '100',
    borderBottom: '1px solid black',
    borderLeft:'1px solid black',
    borderRight:'1px solid black',
    position: 'fixed',
    overflow: 'auto',
    maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
}
let value=''
export default class Stocktakes extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            value: '',
            _id:''
        }

    }
    fetchItems(){
       return Items.find({User:Meteor.userId()}).fetch().map((item)=>{
           return item.ItemName;
       });
    }
    fetch(){
        const columns = [
            {
                Header: 'Ingredients Name', accessor: 'ItemName'
            },{
                Header: 'Quantity', accessor: 'ItemQuantity',width: 90

            }, {
                Header: '', accessor: 'btn',width: 50
            }]

        const data = Temps.find({User: Meteor.userId()}).fetch().map((dat) => {
            return {
                ...dat,
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

        return{
            data:data,
            columns:columns
        }
    };

    handleSubmit(e) {
        e.preventDefault();
        let item = document.getElementsByName("textinput");
        let itemName=item[0].textContent.trim();
        let itemId=""
        try {
            itemId = Items.find({User: Meteor.userId(), ItemName: itemName}).fetch()[0]._id;
        } catch(e){
            alert("Item not in stock")
            return
        }
        let itemQuantity = e.target.ItemQuantity.value;
        e.preventDefault();

            if(Temps.find({IngredientId:itemId}).fetch().length>0){
             alert("Item already in");
                return
             }

            Temps.insert({
                User: Meteor.userId(),
                ItemName: itemName,
                ItemQuantity: itemQuantity,
                IngredientId: itemId

            });



        }


    saveStocktakes(e){
        e.preventDefault();
        let date = new Date()
        let begun = moment(date).format("DD MMMM YYYY");
        let notes = e.target.STnote.value;
        let stocktake = Temps.find({User:Meteor.userId()}).fetch()
        StockTakes.insert({
            User: Meteor.userId(),
            Date: begun,
            Note: notes,
            STitems:stocktake

        })
        Temps.find({User:Meteor.userId}).fetch().map((temp)=>{
            Temps.remove({_id:temp._id})})
        history.push("/stocktakeslist");
        }






    render() {
        return (
            <div className="container">
                <TitleBar title="Stocktakes" mainData="Items: 0"/>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <TextInput name="textinput" options={this.fetchItems()} trigger={""} maxOptions="4"/>
                    <input type = "number" min ="0" step="any" name ="ItemQuantity" placeholder="Quantity"/>
                    <button>Add</button>
                </form>
                <form onSubmit={this.saveStocktakes.bind(this)}>
                    <input type = "text" name ="STnote" placeholder="Notes" className = "typebox"/>
                    <button>Save</button>
                </form>
                <Table data={this.fetch().data} columns={this.fetch().columns}/>
            </div>)
    }
}