import React from 'react'
import Table from '../generic/table'
import {Items} from "../../api/items";
import {Meteor} from "meteor/meteor";
import {Tracker} from "meteor/tracker";
import {RecipeTemps} from "../../api/recipetemps";
import {Recipes} from "../../api/recipes";

export default class recipeListTable extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            id:"not",
            recipes:[]
        }

    }

    componentDidMount(){
        this.recipesListTracker= Tracker.autorun(()=>{
            Meteor.subscribe('recipe');
            const recipes =Recipes.find().fetch();
            this.setState({recipes});


        });

    }

    componentWillUnmount(){
        this.recipesListTracker.stop();
    }


    /*                                                              **
    *                        Table Declaration                      **
    *                                                               */
    fetch() {


        const columns = [
            {
                Header: 'Date', accessor: 'date',width:120
            }, {
                Header: 'Name', accessor: 'recipeName'

            },{  Header: 'Cost', accessor: 'cost', width:100

            },{  Header: 'Retail Price', accessor: 'retailPrice', width:130

            },{  Header: 'Profit', accessor: 'profit', width:100

            },{
                Header:'View/Remove',accessor: 'show',width:130
            }]

        const data = this.state.recipes.map
        ((recipe)=>{
            return {
                ...recipe,
                profit:Math.round(((recipe.retailPrice-recipe.cost)/recipe.retailPrice*100)*100)/100+"%",
                cost: recipe.cost + " £",
                retailPrice:recipe.retailPrice+" £",
                show:
                    <div className={"show_and_remove"}>
                        <i className="fa fa-eye" onClick={(e) => {
                            e.preventDefault();
                            this.setState({id: recipe._id});
                        }}> </i>
                        <i className="fa fa-trash" onClick={(e) => {
                            e.preventDefault();
                            if(confirm("Do you want to remove this recipe?"))
                                Meteor.call("recipes.remove",recipe._id);
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
                    Header: 'Ingredient Name', accessor: 'itemName'
                },{
                    Header: 'Quantity', accessor: 'itemQuantity',width: 90
                },{
                    Header: 'Cost', accessor: 'cost',width: 90
                }]

            const data2 = Recipes.find({_id:this.state.id}).fetch()[0].STitems.map((item)=>{
                return {
                    ...item,
                    cost: item.itemValue + " £",
                    itemQuantity:item.itemQuantity+" "+item.itemMeasure
                }
            });

            return {
                data:data2,
                columns:columns2
            }
        }



    }
    renderBack(){
        if(this.state.id!="not") {
            return (
                <div>
                    <input className="button_controller " type="image" name="back"
                           src="./../../../img/back.svg" border="0" onClick={() => this.setState({id: "not"})}/>
                </div>
            )
        }
            }



    render() {
        return (
            <div>
                {this.renderBack()}
            <Table data={this.fetch().data} columns={this.fetch().columns}/>

            </div>
                )
    }

}


