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
import Footer from './../generic/footer'
import RecipeTable from './recipeTable';
import {Tracker} from "meteor/tracker";


export default class Recipe extends React.Component {

    constructor(props){
        super(props);
        this.state={
            recipetemps: [],
            items:[]
        }
    }

    componentDidMount(){
        this.recipeTracker= Tracker.autorun(()=>{
            Meteor.subscribe('recipeTemps');
            const recipetemps =RecipeTemps.find().fetch();
            this.setState({recipetemps});
            Meteor.subscribe("items");
            const items=Items.find().fetch().map((item) => {
                return item.itemName;
            });
            this.setState({items});


        });

    }

    componentWillUnmount(){
        this.recipeTracker.stop();
    }




    /*                                                      **
    *               Add, Open new Tab, Save Functions       **
    *                                                       **
    *                                                        */

    handleSubmit(e) {
        e.preventDefault();
        // let item = document.getElementsByName("textinput");
        // console.log(e.target.textinput.attributes[0].value);
        Meteor.subscribe("items");
        let itemName = e.target.textinput.value.trim();
        let itemId = ""
        try {
            itemId = Items.find({itemName: itemName}).fetch()[0]._id;
        } catch (e) {
            alert("Item not in stock")
            return
        }
        let itemQuantity = e.target.ItemQuantity.value;
        let itemMeasureUnit = e.target.ItemUnitMeasure.value;
        e.preventDefault();

        if (RecipeTemps.find({ingredientId: itemId}).fetch().length > 0) {
            alert("Item already in");
            return
        }
        let ingredient = Items.find({itemName: itemName}).fetch();
        let measure = ingredient[0].itemUnitMeasure;
        let value = this.calculateValue(itemMeasureUnit,itemQuantity,ingredient[0]);
        Meteor.call("recipeTemps.insert",itemName,itemQuantity,itemMeasureUnit,itemId,value)
        e.target.textinput.value="";

    }

    saveRecipes() {

        let date = new Date()
        let begun = moment(date).format("DD MM YYYY");
        let recipeName;
        let retailPrice;
        if(recipeName=prompt("Insert the recipe's name")) {
            if(retailPrice = prompt("Insert the retail price")){
            let ingredients = RecipeTemps.find().fetch()
            let value = 0;
            value = ingredients.map((item) => {
                return value += item.itemValue;
            })
            Meteor.call("recipes.insert",begun,recipeName,retailPrice,value,ingredients);
            Meteor.call("recipeTemps.drop");
            history.push("/recipelist");
        }}
    }



    /*                                      **
    *               Other functions         **
    *                                       **
    *                                       */

    // fetchItems() {
    //
    //     return
    // }





    calculateValue(itemMeasureUnit,itemQuantity,ingredient){

        if(itemMeasureUnit === ingredient.itemUnitMeasure) {
            return itemQuantity / ingredient.itemQuantity * ingredient.itemPrice;
        }
        if(itemMeasureUnit==="g"){
            switch(ingredient.itemUnitMeasure){
                case "kg": return itemQuantity / (ingredient.itemQuantity*1000) * ingredient.itemPrice;
                case "oz": return itemQuantity / (ingredient.itemQuantity*28.34) * ingredient.itemPrice
                case "unit": return
            }

        }
        if(itemMeasureUnit==="kg") {
            switch (ingredient.itemUnitMeasure) {
                case "g":
                    return (itemQuantity*1000) / ingredient.itemQuantity * ingredient.itemPrice;
                case "oz":
                    return itemQuantity*35.27  / (ingredient.itemQuantity) * ingredient.itemPrice
                case "unit": return
            }

        }
        if(itemMeasureUnit==="oz") {
            switch (ingredient.itemUnitMeasure) {
                case "g":
                    return itemQuantity *28.34 / ingredient.itemQuantity * ingredient.itemPrice;
                case "kg":
                    return (itemQuantity) / (ingredient.itemQuantity*35.274)  * ingredient.itemPrice
                case "unit": return
            }

        }
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
                    history.push("/recipelist")
                }}/>
                <div className={"controller"}>
                    <form id="add_item" onSubmit={this.handleSubmit.bind(this) }>
                        <TextInput Component="input" autocomplete={"off"} placeholder="Item's name" name="textinput" options={this.state.items} trigger={""} maxOptions="4" defaultValue={""}/>
                        <input type="number" min="0" step="any" name="ItemQuantity" placeholder="Quantity"/>
                        <select  name="ItemUnitMeasure" defaultValue="g">
                            <option value="g">g</option>
                            <option value="kg">kg</option>
                            <option value="oz">oz</option>
                            <option value="unit">unit</option>

                        </select>
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
                        this.saveRecipes();
                    }}/>
                </div>
            </div>
        )
    }



    render() {
        return (
            <div className="container">
                <TitleBar title="Recipe" mainData="Items: 0"/>
                <div className={"black_wrapper"}>
                    {this.renderButtons_Controller()}
                </div>
                <RecipeTable/>
                <Footer title={"New recipe"}/>

            </div>
        )}
}
