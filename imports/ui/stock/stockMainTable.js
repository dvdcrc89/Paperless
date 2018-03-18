import React from 'react'
import Table from '../generic/table'
import {Items} from "../../api/items";
import {Meteor} from "meteor/meteor";
import {Tracker} from "meteor/tracker";


export default class StockMainTable extends React.Component {

    constructor(props){
        super(props);
        this.state={
            items: []
        }
    }

    componentDidMount(){
        this.stockMainTracker=Tracker.autorun(()=>{
            Meteor.subscribe('items');
            const items=Items.find().fetch();
            this.setState({items});
            console.log(this.state.items)

        });

    }
    componentWillUnmount(){
        this.stockMainTracker.stop();
    }


    /*                                                           **
    *                        Table Declaration                  **
    *                                                            */

    fetch() {
        const columns = [
            {
                Header: 'Ingredients Name', accessor: 'itemName'
            }, {
                Header: 'Description', accessor: 'itemDescription'
            }, {
                Header: 'Price', accessor: 'priceQuantity',
            }
            , {
                Header: '', accessor: 'btn', width: 50
            }]

        const data = this.state.items.map((dat) => {
            return {
                itemName: dat.itemName,
                itemDescription: dat.itemDescription,
                priceQuantity: dat.itemPrice + "£ / " + dat.itemUnitMeasure + "(" + dat.itemQuantity + ")",
                btn:
                    <i className="fa fa-trash" onClick={(e) => {
                        let itemID = dat._id;
                        if (itemID) {
                            Meteor.call("items.remove",itemID);
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