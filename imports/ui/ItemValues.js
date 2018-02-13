import React from 'react'
import ReactDOM from 'react-dom'
import {Items} from "../api/items";
import propTypes from "prop-types"

export default class ItemsValue extends React.Component{

    render(){
        let sum=0;
        let items = Items.find().fetch();
        items.map((item) => {
            sum+=item.ItemPrice*item.ItemQuantity;

        })
        return (
            <p>{sum}</p>
    )

    }

}