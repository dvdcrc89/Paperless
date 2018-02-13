import React from 'react'
import ReactDOM from 'react-dom'
import {Items} from "../api/items";
import ItemsValue from './ItemValues'
import TitleBar from "./TitleBar";


export default class AddItems extends React.Component{
    handleSubmit(e){
        let itemName = e.target.ItemName.value;
        let itemDescription = e.target.ItemDescription.value;
        let itemQuantity = e.target.ItemQuantity.value;
        let itemPrice = e.target.ItemPrice.value;
        e.preventDefault();
        let length= Items.find().fetch().length+1;
        if(itemName){
            e.target.ItemName.value ='';
            e.target.ItemDescription.value ='';
            e.target.ItemQuantity.value ='';
            e.target.ItemPrice.value ='';

            Items.insert({
                ItemName: itemName,
                ItemDescription: itemDescription,
                ItemQuantity: itemQuantity,
                ItemPrice:itemPrice

            });
        }
    };
    handleRemove(e){
        let itemID = e.target.ItemID.value;
        e.preventDefault();
        if(itemID){
            e.target.ItemID.value="";

            Items.remove(itemID);
        }
    }
    render(){
        return(
            <div>
                <TitleBar title="STOCK" month="February" length={Items.find().fetch().length}/>
                <div id ="controllerWrap">
                    <form onSubmit={this.handleSubmit}>
                        <input type = "text" name ="ItemName" placeholder="Item Name"/>
                        <select  name="ItemDescription" placeholder="Meat">
                            <option value="Meat">Meat</option>
                            <option value="Fish">Fish</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Diary">Diary</option>
                            <option value="Other">Other</option>
                        </select>
                        <input type = "number" min ="0" step="any" name ="ItemQuantity" placeholder="Quantity"/>
                        <input type = "number" min ="0" step="any" name ="ItemPrice" placeholder="Price"/>
                        <button>Add Item</button>
                    </form>
                    <div id="remove">
                    <form onSubmit={this.handleRemove}>
                        <input type = "text" name ="ItemID" placeholder="Item ID"/>
                        <button>Remove Item</button>
                    </form>
                    </div>

                </div>

            </div>
    )
    }
}