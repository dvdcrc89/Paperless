import {StockTakes} from "../../api/stocktakes";
import TitleBar from '../generic/titlebar';
import React from 'react'
import Table from '../generic/table'
import {Meteor} from "meteor/meteor";
import {Temps} from "../../api/temps";
import {history} from "../routes/routes";


export default class StocktakesList extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            id:"not"
        }

    }

    /*                                                           **
    *                        Table Declaration                  **
    *                                                            */
    fetch() {

        const columns = [
            {
                Header: 'Date', accessor: 'Date'
            }, {
                Header: 'Note', accessor: 'Note'

            },{  Header: 'Total Value', accessor: 'TotalValue', width:200

            },{
                Header:'View/Remove',accessor: 'Show',width:130
            }]

        const data = StockTakes.find({User: Meteor.userId()},{sort:{Date: -1}}).fetch().map
        ((stocktake)=>{
            return {
                ...stocktake,
                TotalValue: stocktake.TotalValue + " £",
                Show:
                <div className={"show_and_remove"}>
                    <i className="fa fa-eye" onClick={(e) => {
                        e.preventDefault();
                        this.setState({id: stocktake._id});
                    }}> </i>
                    <i className="fa fa-trash" onClick={(e) => {
                        e.preventDefault();
                        if(confirm("Do you want to remove this stocktake?"))
                        StockTakes.remove({_id:stocktake._id});
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
                    Header: 'Value', accessor: 'ItemValue',width: 90
                }]

            const data2 = StockTakes.find({User: Meteor.userId(),_id:this.state.id}).fetch()[0].STitems.map((item)=>{
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


    /*                                                              **
    *               Add, Open new Tab, Save Buttons                 **
    *                        & Controller                           **
    *                                                               */

    renderButtons_Controller(){
        if(!(this.state.id=="not")){
            return <button onClick={()=>this.setState({id:"not"})}><i className="fa fa-arrow-circle-left"></i></button>
        } else{
            // return <button onClick={()=>history.replace("/stocktakes")}>NEW Stocktake</button>
            return (
                <div className={"controller_bar"}>
                <div className={"buttons"}>
                    <input className="button_controller button_disabled " type="image" name="addItem"
                           src="./../../../img/AddItem.svg" border="0" onClick={() => alert("Button Disabled")}/>
                    <input className="button_controller " type="image" name="newTable"
                           src="./../../../img/Add.svg" border="0" alt="Submit"
                           onClick={()=>history.replace("/stocktakes")}/>
                    <input className="button_controller button_disabled" type="image" name="save"
                           src="./../../../img/Save.svg" border="0" alt="" onClick={() => alert("Button Disabled")}/>
                </div>
                </div>
        )
        }
    }

    /*                                  **
    *               JSX Render          **
    *                                   **
    *                                   */

    render(){
        return(
        <div className="container">
            <TitleBar title="Stocktakes" mainData="Items: 0"/>

            {this.renderButtons_Controller()}

            <Table data={this.fetch().data} columns={this.fetch().columns}/>
        </div>
        )
    }
}

