import React from 'react'
import ReactDOM from 'react-dom'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {Items} from "../api/items";


export default class Table extends React.Component {

    render(){

        const data = this.props.data;

        const columns = [
            {
                Header: 'Ingredients ID',
                accessor: '_id' // String-based value accessors!
            },{
            Header: 'Ingredients Name',
            accessor: 'ItemName' // String-based value accessors!
        },{
            Header: 'Ingredients Description',
            accessor: 'ItemDescription' // String-based value accessors!
    },{
            Header: 'Ingredients Quantity',
            accessor: 'ItemQuantity' // String-based value accessors!
        },{
            Header: 'Ingredients Price',
            accessor: 'ItemPrice' // String-based value accessors!
        }]

        return (
            <ReactTable
                data={data}
                columns={columns}
                pageSize ={10}
            />
        )
    }
}