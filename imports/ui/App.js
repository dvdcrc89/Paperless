import React from 'react'
import AddItems from './AddItems'
import ItemList from './ItemList'
import Table from './Table'


export default class App extends React.Component{
    render() {
        return (<div>
                <AddItems/>
                <Table data={this.props.items}/>
            </div>
        )
    }

}