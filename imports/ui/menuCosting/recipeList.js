import {Recipes} from "../../api/recipes";
import TitleBar from '../generic/titlebar';
import React from 'react'
import Table from '../generic/table'
import {Meteor} from "meteor/meteor";
import {Temps} from "../../api/temps";
import {history} from "../routes/routes";


export default class RecipeList extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            id:"not"
        }

    }
    fetch() {

        const columns = [
            {
                Header: 'Date', accessor: 'Date'
            }, {
                Header: 'Name', accessor: 'RecipeName'

            },{  Header: 'Cost', accessor: 'Cost', width:200

            },{  Header: 'Retail Price', accessor: 'RetailPrice', width:200

            },{  Header: 'Profit', accessor: 'Profit', width:200

            },{
                Header:'View/Remove',accessor: 'Show',width:130
            }]

        const data = Recipes.find({User: Meteor.userId()},{sort:{Date: -1}}).fetch().map
        ((recipe)=>{
            return {
                ...recipe,
                Profit:(recipe.RetailPrice-recipe.Cost)/recipe.RetailPrice*100+"%",
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
                    ItemValue: item.ItemValue + " £"
                }
            });

            console.log(data2);
            return {
                data:data2,
                columns:columns2
            }
        }



    }
    renderBack(){
        if(!(this.state.id=="not")){
            return <button onClick={()=>this.setState({id:"not"})}>Back to Menu</button>
        } else{
            return <button onClick={()=>history.replace("/recipe")}>ADD Recipe</button>
        }
    }
    render(){
        return(
            <div className="container">
                <TitleBar title="Menu" mainData="Items: 0"/>
                <div className="formstyle">
                    <div className="controllerWrap">
                        {this.renderBack()}
                    </div></div>
                <Table data={this.fetch().data} columns={this.fetch().columns}/>
            </div>
        )
    }
}

