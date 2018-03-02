import TitleBar from '../generic/titlebar';
import React from 'react'
import Table from '../generic/table'
import ReactAutocomplete from 'react-autocomplete';
import {Items} from './../../api/items'
import {Meteor} from 'meteor/meteor'
import {RecipeTemps} from './../../api/recipetemps'
import {Recipes} from "../../api/recipes";
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

export default class Recipe extends React.Component {

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
                Header: 'Cost', accessor: 'ItemValue', width: 90

            }, {
                Header: '', accessor: 'btn', width: 50
            }]

        const data = RecipeTemps.find({User: Meteor.userId()}).fetch().map((dat) => {
            return {
                ItemName: dat.ItemName,
                ItemQuantity: dat.ItemQuantity + " " + dat.ItemMeasure,
                ItemValue: dat.ItemValue + "£",
                btn:
                    <button onClick={() => {
                        let itemID = dat._id;
                        if (itemID) {
                            RecipeTemps.remove(itemID);
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
        let itemMeasureUnit = e.target.ItemUnitMeasure.value;
        e.preventDefault();

        if (RecipeTemps.find({IngredientId: itemId}).fetch().length > 0) {
            alert("Item already in");
            return
        }
        let ingredient = Items.find({User: Meteor.userId(), ItemName: itemName}).fetch();
        let measure = ingredient[0].ItemUnitMeasure;
        let value = this.calculateValue(itemMeasureUnit,itemQuantity,ingredient[0]);
        RecipeTemps.insert({
            User: Meteor.userId(),
            ItemName: itemName,
            ItemQuantity: itemQuantity,
            ItemMeasure: itemMeasureUnit,
            IngredientId: itemId,
            ItemValue: Math.round(value * 100) / 100

        });
        e.target.textinput.value="";

    }

    calculateValue(itemMeasureUnit,itemQuantity,ingredient){
        console.log(itemMeasureUnit === ingredient.ItemUnitMeasure);
        if(itemMeasureUnit === ingredient.ItemUnitMeasure) {
            return itemQuantity / ingredient.ItemQuantity * ingredient.ItemPrice;
        }
        if(itemMeasureUnit==="g"){
            switch(ingredient.ItemUnitMeasure){
                case "kg": return itemQuantity / (ingredient.ItemQuantity*1000) * ingredient.ItemPrice;
                case "oz": return itemQuantity / (ingredient.ItemQuantity*28.34) * ingredient.ItemPrice
                case "unit": return
            }

        }
        if(itemMeasureUnit==="kg") {
            switch (ingredient.ItemUnitMeasure) {
                case "g":
                    return (itemQuantity*1000) / ingredient.ItemQuantity * ingredient.ItemPrice;
                case "oz":
                    return itemQuantity*35.27  / (ingredient.ItemQuantity) * ingredient.ItemPrice
                case "unit": return
            }

        }
        if(itemMeasureUnit==="oz") {
            switch (ingredient.ItemUnitMeasure) {
                case "g":
                    return itemQuantity *28.34 / ingredient.ItemQuantity * ingredient.ItemPrice;
                case "kg":
                    return (itemQuantity) / (ingredient.ItemQuantity*35.274)  * ingredient.ItemPrice
                case "unit": return
            }

        }
    }




    saveRecipes() {

        let date = new Date()
        let begun = moment(date).format("DD MM YYYY");
        let recipeName = prompt("Insert the recipe's name");
        let retailPrice = prompt("Insert the retail price");
        let ingredients = RecipeTemps.find({User: Meteor.userId()}).fetch()
        let value = 0;
        value = ingredients.map((item) => {
            return value += item.ItemValue;
        })
        console.log(value)
        Recipes.insert({
            User: Meteor.userId(),
            Date: begun,
            RecipeName: recipeName,
            RetailPrice: retailPrice,
            Cost: Math.round(value[value.length - 1] * 100) / 100,
            STitems: ingredients

        })
        RecipeTemps.find({User: Meteor.userId}).fetch().map((temp) => {
            RecipeTemps.remove({_id: temp._id})
        })
        history.push("/recipelist");
    }


    render() {
        return (
            <div className="container">
                <TitleBar title="Recipe" mainData="Items: 0"/>

                <div className='formstyle'>

                    <div className="controllerwrap">

                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <TextInput Component="input"  placeholder="Item's name" name="textinput" options={this.fetchItems()} trigger={""} maxOptions="4" defaultValue={""}/>
                            <input type="number" min="0" step="any" name="ItemQuantity" placeholder="Quantity"/>
                            <select  name="ItemUnitMeasure" defaultValue="g">
                                <option value="g">g</option>
                                <option value="kg">kg</option>
                                <option value="oz">oz</option>
                                <option value="unit">unit</option>

                            </select>
                            <input className="button_controller " type="image" name="" src="./../../../img/AddItem.svg" border="0"   />
                            <img className="button_controller button_disabled" type="image" name="submit" src="./../../../img/Add.svg" border="0" alt="Submit" onClick={()=>alert("Button Disabled")} />
                            <input className="button_controller " type="image" name="save" src="./../../../img/Save.svg" border="0" alt="" onClick={(e)=>{
                                e.preventDefault();
                                this.saveRecipes()}} />
                        </form>

                    </div>
                </div>

                <Table data={this.fetch().data} columns={this.fetch().columns}/>

                    <button onClick={
                        (e)=>{
                            e.preventDefault();
                            history.push("/recipelist");
                        }
                    }> <i className="fa fa-arrow-circle-left"></i></button>
                    <div>

                    </div>
                </div>
           )
    }
}