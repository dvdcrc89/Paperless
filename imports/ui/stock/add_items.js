import React from 'react'
import ReactDOM from 'react-dom'
import {Items} from "./../../api/items"
import TitleBar from "../generic/titlebar";
import {Meteor} from 'meteor/meteor'


export default class AddItems extends React.Component{
    handleSubmit(e){
        let itemName = e.target.ItemName.value;
        let itemDescription = e.target.ItemDescription.value;
        let itemQuantity = e.target.ItemQuantity.value;
        let itemPrice = e.target.ItemPrice.value;
        e.preventDefault();
        let length= Items.find({User: Meteor.userId()}).fetch().length+1;
        if(itemName){
            e.target.ItemName.value ='';
            e.target.ItemDescription.value ='';
            e.target.ItemQuantity.value ='';
            e.target.ItemPrice.value ='';

            Items.insert({
                User: Meteor.userId(),
                ItemName: itemName,
                ItemDescription: itemDescription,
                ItemQuantity: itemQuantity,
                ItemPrice:itemPrice

            });
        }
    };
    handleSubmit(e){
        let itemName = e.target.ItemName.value;
        let itemDescription = e.target.ItemDescription.value;
        let itemQuantity = e.target.ItemQuantity.value;
        let itemPrice = e.target.ItemPrice.value;
        let itemUnitMeasure = e.target.ItemUnitMeasure.value;
        e.preventDefault();
        let length= Items.find({User: Meteor.userId()}).fetch().length+1;
        if(itemName){
            e.target.ItemName.value ='';
            e.target.ItemDescription.value ='';
            e.target.ItemQuantity.value ='';
            e.target.ItemPrice.value ='';

            Items.insert({
                User: Meteor.userId(),
                ItemName: itemName,
                ItemDescription: itemDescription,
                ItemQuantity: itemQuantity,
                ItemPrice:itemPrice,
                ItemUnitMeasure:itemUnitMeasure

            });
        }
    };
    render(){
        return(

                <div className = 'formstyle'>
                <div className ="controllerWrap">
                    <form onSubmit={this.handleSubmit}>
                        <input type = "text" name ="ItemName" placeholder="Item Name" className = "typebox"/>
                        <select  name="ItemDescription" placeholder="Meat">
                            <option value="Meat">Meat</option>
                            <option value="Fish">Fish</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Diary">Diary</option>
                            <option value="Other">Other</option>
                        </select>
                        <input type = "number" min ="0" step="any" name ="ItemPrice" placeholder="Price"/>
                        <input type = "number" min ="0" step="any" name ="ItemQuantity" defaultValue="1"/>
                        <select  name="ItemUnitMeasure" placeholder="Meat">
                            <option value="g">g</option>
                            <option value="kg">kg</option>
                            <option value="oz">oz</option>
                            <option value="unit">unit</option>
                        </select>
                        <button>Add Item</button>
                    </form>

                </div>
            </div>

    )
    }
}