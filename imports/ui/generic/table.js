import React from 'react'
import ReactDOM from 'react-dom'
import ReactTable from 'react-table'
import {Items} from "../../api/items";


export default class Table extends React.Component {


    render(){

        return (
            <div className="table">
                <ReactTable
                    data={this.props.data}
                    columns={this.props.columns}
                    defaultPageSize ={10}

                />
                </div>
        )
    }
}