import {StockTakes} from "../../api/stocktakes";
import TitleBar from '../generic/titlebar';
import React from 'react'
import Table from '../generic/table'
import {Meteor} from "meteor/meteor";
import {Temps} from "../../api/temps";

export default class StocktakesList extends React.Component {

    fetch() {
        const columns = [
            {
                Header: 'Date', accessor: 'Date'
            }, {
                Header: 'Note', accessor: 'Note', width: 90

            }]

        const data = StockTakes.find({User: Meteor.userId()}).fetch();

        return {
            data: data,
            columns: columns
        }
    }

    render(){
        return(
        <div className="container">
            <TitleBar title="Stocktakes" mainData="Items: 0"/>
            <Table data={this.fetch().data} columns={this.fetch().columns}/>
        </div>
        )
    }
}

