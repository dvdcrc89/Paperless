import TitleBar from '../generic/titlebar';
import React from 'react'
import Table from '../generic/table'

export default class FridgeFreezer extends React.Component {


    render() {
        return (
            <div className="container">
                <TitleBar title="Fridge and Freezer temperatures" mainData="Total F/F taken: 0"/>
                {/*<Table/>*/}
            </div>)
    }
}