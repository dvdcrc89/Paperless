import {Items} from './../../api/items'
import React from 'react'
import {Meteor} from "meteor/meteor";
export default class Autocomplete extends React.Component {
    render(){
        return(
            <form>
                <input type="text" name="inputText"/>
            </form>
        )
    }
    
}