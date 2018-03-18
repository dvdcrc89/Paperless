import React from 'react'
import Table from '../generic/table'
import {Items} from "../../api/items";
import {Meteor} from "meteor/meteor";
import {Tracker} from "meteor/tracker";
import {RecipeTemps} from "../../api/recipetemps";


export default class RecipeTable extends React.Component {

    constructor(props){
        super(props);
        this.state={
            recipetemps: []
        }
    }

    componentDidMount(){
        this.recipeTracker= Tracker.autorun(()=>{
            Meteor.subscribe('recipeTemps');
            const recipetemps =RecipeTemps.find().fetch();
            this.setState({recipetemps});


        });

    }

    componentWillUnmount(){
        this.recipeTracker.stop();
    }

    /*                                                              **
    *                        Table Declaration                      **
    *                                                               */

    fetch() {
        const columns = [
            {
                Header: 'Ingredient Name', accessor: 'itemName'
            }, {
                Header: 'Quantity', accessor: 'itemQuantity', width: 90

            }, {
                Header: 'Cost', accessor: 'itemValue', width: 90

            }, {
                Header: '', accessor: 'btn', width: 50
            }]

        const data = this.state.recipetemps.map((dat) => {
            return {
                itemName: dat.itemName,
                itemQuantity: dat.itemQuantity + " " + dat.itemMeasure,
                itemValue: dat.itemValue + "£",
                btn:
                    <i className="fa fa-trash" onClick={() => {
                        let itemID = dat._id;
                        if (itemID) {
                           Meteor.call("recipeTemps.remove",itemID)
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


    render() {
        return (

            <Table data={this.fetch().data} columns={this.fetch().columns}/>)
    }


}