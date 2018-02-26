import TitleBar from '../generic/titlebar';
import React from 'react'
import Table from '../generic/table'

export default class Stocktakes extends React.Component {


    render() {
        return (
            <div className="container">
                <TitleBar title="Stocktakes" mainData="Total Stocktakes: 0"/>
                {/*<Table/>*/}
            </div>)
    }
}