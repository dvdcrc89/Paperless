import React from 'react'
import ReactDOM from 'react-dom'
import {Items} from "./../../api/items"
import propTypes from "prop-types"
import Item from './Item'

export default class ItemList extends React.Component {

    renderItem () {

        return this.props.items.map((item) => {
                return (
                    <li>
                    <Item key={item._id} item={item}/>
                    </li>
                );

            });

        }

    render(){
        return (
            <div>
                {this.renderItem()}
            </div>
        );

    }
}

