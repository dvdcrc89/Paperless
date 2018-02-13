import React from 'react'
import ReactDOM from 'react-dom'
import {Items} from "../api/items";
import propTypes from "prop-types"

export default class Item extends React.Component{

    render(){
        return(
            <ul key ={this.props.item._id}>
                {this.props.item.ItemName}  {this.props.item.ItemDescription} {this.props.item.ItemQuantity} {this.props.item.ItemPrice}
                <button onClick = { ()=> Items.remove(this.props.item._id)}>X</button>
                <hr/>
            </ul>
        )
    }
}
