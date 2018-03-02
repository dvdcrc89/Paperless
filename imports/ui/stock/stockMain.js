import React from 'react'
import Table from '../generic/table'
import {Items} from "../../api/items";
import TitleBar from '../generic/titlebar';
import {Meteor} from "meteor/meteor";


export default class StockMain extends React.Component {


    /*                                                           **
     *                        Table Declaration                  **
     *                                                            */

    fetch() {
        const columns = [
            {
                Header: 'Ingredients Name', accessor: 'ItemName'
            }, {
                Header: 'Description', accessor: 'ItemDescription'
            }, {
                Header: 'Price', accessor: 'PriceQuantity',
            }
            , {
                Header: '', accessor: 'btn', width: 50
            }]

        const data = Items.find({User: Meteor.userId()}).fetch().map((dat) => {
            return {
                ItemName: dat.ItemName,
                ItemDescription: dat.ItemDescription,
                PriceQuantity: dat.ItemPrice + "£ / " + dat.ItemUnitMeasure + "(" + dat.ItemQuantity + ")",
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

        return {
            data: data,
            columns: columns
        }
    };


    /*                                                      **
    *               Add, Open new Tab, Save Functions       **
    *
    *                                                        */

    handleSubmit(e) {
        let itemName = e.target.ItemName.value;
        let itemDescription = e.target.ItemDescription.value;
        let itemQuantity = e.target.ItemQuantity.value;
        let itemPrice = e.target.ItemPrice.value;
        let itemUnitMeasure = e.target.ItemUnitMeasure.value;
        e.preventDefault();
        let length = Items.find({User: Meteor.userId()}).fetch().length + 1;
        if (itemName) {
            e.target.ItemName.value = '';
            e.target.ItemDescription.value = '';
            e.target.ItemQuantity.value = '';
            e.target.ItemPrice.value = '';

            Items.insert({
                User: Meteor.userId(),
                ItemName: itemName,
                ItemDescription: itemDescription,
                ItemQuantity: itemQuantity,
                ItemPrice: itemPrice,
                ItemUnitMeasure: itemUnitMeasure

            });
        }
    };

    /*                                                              **
    *               Add, Open new Tab, Save Buttons                 **
    *                        & Controller                           **
    *                                                               */
    renderButtons_Controller() {
        return (
            <div className={"controller_bar"}>
                <div className={"controller"}>
                    <form id="add_item" onSubmit={this.handleSubmit}>
                        <input type="text" name="ItemName" placeholder="Item Name" className="typebox"/>
                        <select name="ItemDescription" placeholder="Meat">
                            <option value="Meat">Meat</option>
                            <option value="Fish">Fish</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Diary">Diary</option>
                            <option value="Other">Other</option>
                        </select>
                        <input type="number" min="0" step="any" name="ItemPrice" placeholder="Price"/>
                        <input type="number" min="0" step="any" name="ItemQuantity" defaultValue="1"/>
                        <select name="ItemUnitMeasure" placeholder="Meat">
                            <option value="g">g</option>
                            <option value="kg">kg</option>
                            <option value="oz">oz</option>
                            <option value="unit">unit</option>
                        </select>
                    </form>
                </div>
                <div className={"buttons"}>
                    <input className="button_controller " type="image" name="addItem" form={"add_item"}
                           src="./../../../img/AddItem.svg" border="0"/>
                    <input className="button_controller button_disabled" type="image" name="newTable"
                           src="./../../../img/Add.svg" border="0" alt="Submit"
                           onClick={() => alert("Button Disabled")}/>
                    <input className="button_controller button_disabled" type="image" name="save"
                           src="./../../../img/Save.svg" border="0" alt="" onClick={() => alert("Button Disabled")}/>
                </div>
            </div>
        )
    }

    /*                                  **
    *               JSX Render          **
    *                                   **
    *                                   */


    render() {
        return (

            <div class="container">
                {console.log(Items.find({User: Meteor.userId()}).fetch())}
                <TitleBar title="STOCK" mainData={"Total items: " + this.fetch().data.length}/>
                {this.renderButtons_Controller()}
                <Table data={this.fetch().data} columns={this.fetch().columns}/>
            </div>
        )
    }

}