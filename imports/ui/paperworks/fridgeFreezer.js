import TitleBar from '../generic/titlebar';
import React from 'react'
import Table from '../generic/table'
import AddFFTemperature from './addFFTemperature'

export default class FridgeFreezer extends React.Component {


    render() {
        return (
            <div className="container">
                <TitleBar/>
                <AddFFTemperature/>
                {/*<Table/>*/}
            </div>)
    }
}