import React from 'react'
import AddItems from './add_items'
import Table from '../generic/table'
import {Items} from "../../api/items";
import TitleBar from '../generic/titlebar';
import {Meteor} from "meteor/meteor";



export default class StockMain extends React.Component{

    fetch(){
        const columns = [
           {
                Header: 'Ingredients Name', accessor: 'ItemName'
            }, {
                Header: 'Description', accessor: 'ItemDescription'
            }, {
                Header: 'Price', accessor: 'PriceQuantity',
            }
            , {
                Header: '', accessor: 'btn',width: 50
            }]

        const data = Items.find({User: Meteor.userId()}).fetch().map((dat) => {
            return {
                ItemName: dat.ItemName,
                ItemDescription:dat.ItemDescription,
                PriceQuantity: dat.ItemPrice+"£ / "+dat.ItemUnitMeasure+"("+dat.ItemQuantity+")",
                btn:
                    <i className="fa fa-trash" onClick={(e) => {
                        let itemID = dat._id;
                        console.log(dat._id);
                        if (itemID) {
                            Items.remove(itemID);
                        }
                        }

                    }></i>
            }
        });

        return{
            data:data,
            columns:columns
        }
    };

    render() {
        return (

            <div class="container">
                {console.log(Items.find({User: Meteor.userId()}).fetch())}
                <TitleBar title="STOCK" mainData= {"Total items: " +this.fetch().data.length}/>
                <AddItems/>
                <Table data={this.fetch().data} columns={this.fetch().columns}/>
            </div>
        )
    }

}