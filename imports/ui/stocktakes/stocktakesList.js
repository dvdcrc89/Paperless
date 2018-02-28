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
    fetch() {

        const columns = [
            {
                Header: 'Date', accessor: 'Date'
            }, {
                Header: 'Note', accessor: 'Note'

            },{  Header: 'Total Value', accessor: 'TotalValue'

            },{
                Header:'Show',accessor: 'Show',width:90
            }]

        const data = StockTakes.find({User: Meteor.userId()},{sort:{Date: -1}}).fetch().map
        ((stocktake)=>{
            return{
                ...stocktake,
                TotalValue:stocktake.TotalValue+" £",
                Show:
                    <i className="fa fa-eye" onClick={(e) => {
                        e.preventDefault();
                        this.setState({id:stocktake._id});
                    }}>

                    </i>
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
    renderBack(){
        if(!(this.state.id=="not")){
            return <button onClick={()=>this.setState({id:"not"})}>Back to Stocktakes</button>
        } else{
            return <button onClick={()=>history.replace("/stocktakes")}>NEW Stocktake</button>
        }
    }
    render(){
        return(
        <div className="container">
            <TitleBar title="Stocktakes" mainData="Items: 0"/>
            {this.renderBack()}
            <Table data={this.fetch().data} columns={this.fetch().columns}/>
        </div>
        )
    }
}

