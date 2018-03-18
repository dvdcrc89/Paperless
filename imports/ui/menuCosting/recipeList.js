import {Recipes} from "../../api/recipes";
import TitleBar from '../generic/titlebar';
import React from 'react'
import Table from '../generic/table'
import {Meteor} from "meteor/meteor";
import {Temps} from "../../api/temps";
import {history} from "../routes/routes";
import Footer from './../generic/footer'
import RecipeListTable from './recipeListTable';



export default class RecipeList extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            id:"not"
        }

    }




    /*                                                              **
    *               Add, Open new Tab, Save Buttons                 **
    *                        & Controller                           **
    *                                                               */
    renderButtons_Controller(){
        if(!(this.state.id=="not")){
            return (
                <div className={"controller_bar"}>
                    <input className="button_controller " type="image" name="back"
                           src="./../../../img/back.svg" border="0" onClick={()=>this.setState({id:"not"})}/>                    <div className={"controller"}></div>
                    <div className={"buttons"}>
                        <input className="button_controller button_disabled " type="image" name="addItem"
                               src="./../../../img/AddItem.svg" border="0" onClick={() => alert("Button Disabled")}/>
                        <input className="button_controller button_disabled" type="image" name="newTable"
                               src="./../../../img/Add.svg" border="0" alt="Submit"
                               onClick={()=>history.replace("/recipe")}/>
                        <input className="button_controller button_disabled" type="image" name="save"
                               src="./../../../img/Save.svg" border="0" alt="" onClick={() => alert("Button Disabled")}/>
                    </div>
                </div>

            )
        } else{
            return (
                <div className={"controller_bar"}>
                    <div className={"controller"}></div>
                <div className={"buttons"}>
                    <input className="button_controller button_disabled " type="image" name="addItem"
                           src="./../../../img/AddItem.svg" border="0" onClick={() => alert("Button Disabled")}/>
                    <input className="button_controller " type="image" name="newTable"
                           src="./../../../img/Add.svg" border="0" alt="Submit"
                           onClick={()=>history.replace("/recipe")}/>
                    <input className="button_controller button_disabled" type="image" name="save"
                           src="./../../../img/Save.svg" border="0" alt="" onClick={() => alert("Button Disabled")}/>
                </div>
                </div>
            )
        }
    }
    render(){
        return(
            <div className="container">
                <TitleBar title="Menu" mainData="Items: 0"/>
                <div className={"black_wrapper"}>
                {this.renderButtons_Controller()}
                </div>
                <RecipeListTable/>
                <Footer title={"Menu"}/>

            </div>

        )
    }
}

