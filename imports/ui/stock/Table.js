import React from 'react'
import ReactDOM from 'react-dom'
import ReactTable from 'react-table'
import {Items} from "./../../api/items";


export default class Table extends React.Component {

    render(){

        const data = this.props.data;

        const columns = [
            {
                Header: 'ID', accessor: '_id'
            },{
                Header: 'Ingredients Name', accessor: 'ItemName'
            },{
                Header: 'Description', accessor: 'ItemDescription'
            },{
                Header: 'Quantity', accessor: 'ItemQuantity',

            },{
                Header: 'Price in £', accessor: 'ItemPrice'

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