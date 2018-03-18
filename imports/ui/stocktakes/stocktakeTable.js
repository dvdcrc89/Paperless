import {Temps} from "../../api/temps";
import {Tracker} from "meteor/tracker";
import {Meteor} from 'meteor/meteor';
import Table from './../generic/table';
import React from 'react';
import ReactDOM from 'react-dom';
export default class StocktakeTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            temps: []
        }
    }

    componentDidMount() {
        this.stocktakeTracker = Tracker.autorun(() => {
            Meteor.subscribe('temps');
            const temps = Temps.find().fetch();
            this.setState({temps});


        });

    }

    componentWillUnmount() {
        this.stocktakeTracker.stop();
    }

    /*                                                           **
        *                        Table Declaration                  **
        *                                                            */


    fetch() {
        const columns = [
            {
                Header: 'Ingredient Name', accessor: 'itemName'
            }, {
                Header: 'Quantity', accessor: 'itemQuantity', width: 90

            }, {
                Header: 'Value', accessor: 'itemValue', width: 90

            }, {
                Header: '', accessor: 'btn', width: 50
            }]

        const data = this.state.temps.map((dat) => {
            return {
                itemName: dat.itemName,
                itemQuantity: dat.itemQuantity + " " + dat.itemMeasure,
                itemValue: dat.itemValue + "£",
                btn:
                    <i className="fa fa-trash" onClick={() => {
                        let itemID = dat._id;
                        if (itemID) {
                                    Meteor.call("temps.remove",itemID);
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