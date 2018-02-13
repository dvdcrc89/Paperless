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
                Header: 'ID',
                accessor: '_id' // String-based value accessors!
            },{
            Header: 'Ingredients Name',
            accessor: 'ItemName' // String-based value accessors!
        },{
            Header: 'Description',
            accessor: 'ItemDescription' // String-based value accessors!
    },{
            Header: 'Quantity',
            accessor: 'ItemQuantity', // String-based value accessors!

        },{
            Header: 'Price in £',
            accessor: 'ItemPrice', // String-based value accessors!

        }]

        return (
            <ReactTable
                data={data}
                columns={columns}
                defaultPageSize ={10}

            />
        )
    }
}