import TitleBar from '../generic/titlebar';
import React from 'react'
import Table from '../generic/table'
import ReactAutocomplete from 'react-autocomplete';
import {Items} from './../../api/items'
import {Meteor} from 'meteor/meteor'
import {Temps} from './../../api/temps'

export default class Stocktakes extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            value: '',
            _id:''
        }
    }
    fetch(){
        const columns = [
            {
                Header: 'Ingredients Name', accessor: 'ItemName'
            },{
                Header: 'Quantity', accessor: 'ItemQuantity',width: 90

            }, {
                Header: '', accessor: 'btn',width: 50
            }]

        const data = Temps.find({User: Meteor.userId()}).fetch().map((dat) => {
            return {
                ...dat,
                btn:
                    <button onClick={() => {
                        let itemID = dat._id;
                        console.log(dat._id);
                        if (itemID) {
                            Temps.remove(itemID);
                        }
                    }

                    }>X</button>
            }
        });

        return{
            data:data,
            columns:columns
        }
    };

    handleSubmit(e) {
        let itemId = this.state._id;
        let itemQuantity = e.target.ItemQuantity.value;
        e.preventDefault();
        if (itemId) {
            const item = Items.find({
                User: Meteor.userId(),
                _id: itemId
            }).fetch()
            e.target.ItemQuantity.value = '';
            this.setState({_id: ''});
            console.log(item)
            Temps.insert({
                User: Meteor.userId(),
                ItemName: item[0].ItemName,
                ItemQuantity: itemQuantity,

            });

        }
    }

    render() {
        return (
            <div className="container">
                <TitleBar title="Stocktakes" mainData="Items: 0"/>
                <form onSubmit={this.handleSubmit.bind(this)}>
                <ReactAutocomplete
                    items={Items.find({User:Meteor.userId()}).fetch()}
                    shouldItemRender={(item, value) => item.ItemName.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    getItemValue={item => {
                        this.setState({_id:item._id})
                        return item.ItemName;

                    }}
                    renderItem={(item, highlighted) =>
                        <div
                            key={item._id}
                            style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                        >
                            {item.ItemName}
                        </div>
                    }
                    value={this.state.value}
                    onChange={e => this.setState({ value: e.target.value })}
                    onSelect={value => this.setState({ value })}
                />
                    <input type = "number" min ="0" step="any" name ="ItemQuantity" placeholder="Quantity"/>
                    <button>Add</button>
                </form>
                <Table data={this.fetch().data} columns={this.fetch().columns}/>
            </div>)
    }
}