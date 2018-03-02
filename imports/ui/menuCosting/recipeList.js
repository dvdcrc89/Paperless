import {Recipes} from "../../api/recipes";
import TitleBar from '../generic/titlebar';
import React from 'react'
import Table from '../generic/table'
import {Meteor} from "meteor/meteor";
import {Temps} from "../../api/temps";
import {history} from "../routes/routes";
import Footer from './../generic/footer'



export default class RecipeList extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            id:"not"
        }

    }

    /*                                                              **
    *                        Table Declaration                      **
    *                                                               */
    fetch() {

        const columns = [
            {
                Header: 'Date', accessor: 'Date',width:120
            }, {
                Header: 'Name', accessor: 'RecipeName'

            },{  Header: 'Cost', accessor: 'Cost', width:100

            },{  Header: 'Retail Price', accessor: 'RetailPrice', width:130

            },{  Header: 'Profit', accessor: 'Profit', width:100

            },{
                Header:'View/Remove',accessor: 'Show',width:130
            }]

        const data = Recipes.find({User: Meteor.userId()},{sort:{Date: -1}}).fetch().map
        ((recipe)=>{
            return {
                ...recipe,
                Profit:Math.round(((recipe.RetailPrice-recipe.Cost)/recipe.RetailPrice*100)*100)/100+"%",
                Cost: recipe.Cost + " £",
                RetailPrice:recipe.RetailPrice+" £",
                Show:
                    <div className={"show_and_remove"}>
                        <i className="fa fa-eye" onClick={(e) => {
                            e.preventDefault();
                            this.setState({id: recipe._id});
                        }}> </i>
                        <i className="fa fa-trash" onClick={(e) => {
                            e.preventDefault();
                            if(confirm("Do you want to remove this recipe?"))
                                Recipes.remove({_id:recipe._id});
                        }}></i>
                    </div>
            }})


        if(this.state.id=="not"){
            return {
                data: data,
                columns: columns
            }} else {
            const columns2 = [
                {
                    Header: 'Ingredient Name', accessor: 'ItemName'
                },{
                    Header: 'Quantity', accessor: 'ItemQuantity',width: 90
                },{
                    Header: 'Cost', accessor: 'Cost',width: 90
                }]

            const data2 = Recipes.find({User: Meteor.userId(),_id:this.state.id}).fetch()[0].STitems.map((item)=>{
                return {
                    ...item,
                    Cost: item.ItemValue + " £",
                    ItemQuantity:item.ItemQuantity+" "+item.ItemMeasure
                }
            });

            console.log(data2);
            return {
                data:data2,
                columns:columns2
            }
        }



    }


    /*                                                              **
    *               Add, Open new Tab, Save Buttons                 **
    *                        & Controller                           **
    *                                                               */
    renderButtons_Controller(){
        if(!(this.state.id=="not")){
            return (
                <div className={"controller_bar"}>
                <button onClick={()=>this.setState({id:"not"})}><i className="fa fa-arrow-circle-left"></i></button>
                    <div className={"controller"}></div>
                    <div className={"buttons"}>
                        <input className="button_controller button_disabled " type="image" name="addItem"
                               src="./../../../img/AddItem.svg" border="0" onClick={() => alert("Button Disabled")}/>
                        <input className="button_controller button_disabled" type="image" name="newTable"
                               src="./../../../img/Add.svg" border="0" alt="Submit"
                               onClick={()=>history.replace("/recipe")}/>
                        <input className="button_controller button_disabled" type="image" name="save"
                               src="./../../../img/Save.svg" border="0" alt="" onClick={() => alert("Button Disabled")}/>
                    </div>
                </div>

            )
        } else{
            return (
                <div className={"controller_bar"}>
                    <div className={"controller"}></div>
                <div className={"buttons"}>
                    <input className="button_controller button_disabled " type="image" name="addItem"
                           src="./../../../img/AddItem.svg" border="0" onClick={() => alert("Button Disabled")}/>
                    <input className="button_controller " type="image" name="newTable"
                           src="./../../../img/Add.svg" border="0" alt="Submit"
                           onClick={()=>history.replace("/recipe")}/>
                    <input className="button_controller button_disabled" type="image" name="save"
                           src="./../../../img/Save.svg" border="0" alt="" onClick={() => alert("Button Disabled")}/>
                </div>
                </div>
            )
        }
    }
    render(){
        return(
            <div className="container">
                <TitleBar title="Menu" mainData="Items: 0"/>
                {this.renderButtons_Controller()}
                <Table data={this.fetch().data} columns={this.fetch().columns}/>
                <Footer title={"Menu"}/>

            </div>

        )
    }
}

