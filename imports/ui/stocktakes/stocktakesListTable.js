import {StockTakes} from "../../api/stocktakes";
import TitleBar from '../generic/titlebar';
import React from 'react'
import Table from '../generic/table'
import {Meteor} from "meteor/meteor";
import {Temps} from "../../api/temps";
import {history} from "../routes/routes";
import Footer from './../generic/footer'
import {Tracker} from "meteor/tracker";
import {Recipes} from "../../api/recipes";


export default class StocktakesListTable extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            id:"not",
            stocktakes:[]
        }

    }


    componentDidMount(){
        this.StocktakesListTracker= Tracker.autorun(()=>{
            Meteor.subscribe('stocktakes');
            const stocktakes =StockTakes.find().fetch();
            console.log(StockTakes.find().fetch());
            this.setState({stocktakes});


        });

    }

    componentWillUnmount(){
        this.StocktakesListTracker.stop();
    }


    /*                                                           **
    *                        Table Declaration                  **
    *                                                            */
    fetch() {

        const columns = [
            {
                Header: 'Date', accessor: 'Date',width:180
            }, {
                Header: 'Note', accessor: 'Note'

            },{  Header: 'Total Value', accessor: 'TotalValue',width:180

            },{
                Header:'View/Remove',accessor: 'Show',width:130
            }]

        const data = this.state.stocktakes.map
        ((stocktake)=>{
            return {
                ...stocktake,
                TotalValue: <div className="money"> {stocktake.TotalValue} £</div>,
                Show:
                    <div className={"show_and_remove"}>
                        <i className="fa fa-eye" onClick={(e) => {
                            e.preventDefault();
                            this.setState({id: stocktake._id});
                        }}> </i>
                        <i className="fa fa-trash" onClick={(e) => {
                            e.preventDefault();
                            if(confirm("Do you want to remove this stocktake?"))
                                Meteor.call("stockTakes.remove",(stocktake._id));
                        }}></i>
                    </div>
            }})


        if(this.state.id=="not"){
            return {
                data: data,
                columns: columns
            }} else {
            const columns2 = [
                {
                    Header: 'Ingredient Name', accessor: 'itemName'
                },{
                    Header: 'Quantity', accessor: 'itemQuantity',width: 90
                },{
                    Header: 'Value', accessor: 'ItemValue',width: 90
                }]

            const data2 = StockTakes.find({_id:this.state.id}).fetch()[0].STitems.map((item)=>{
                console.log(item);
                return {
                    ...item,
                    itemQuantity: item.itemQuantity+" "+item.itemMeasure,
                    ItemValue: item.itemValue + " £"
                }
            });

            console.log(data2);
            return {
                data:data2,
                columns:columns2
            }
        }



    }


    renderBack(){
        if(this.state.id!="not") {
            return (
                <div>
                    <input className="button_controller " type="image" name="back"
                           src="./../../../img/back.svg" border="0" onClick={() => this.setState({id: "not"})}/>
                </div>
            )
        }
    }


    /*                                  **
    *               JSX Render          **
    *                                   **
    *                                   */

    render(){
        return(
            <div className="container">
                {this.renderBack()}
                <Table data={this.fetch().data} columns={this.fetch().columns}/>
            </div>
        )
    }
}

