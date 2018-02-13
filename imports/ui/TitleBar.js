import React from 'react'
import ReactDOM from 'react-dom'
import propTypes from 'prop-types'
import AccountDropdown from "./AccountDropdown";

export default class TitleBar extends React.Component{


    returnDate(){
        var date = new Date()
        var begun = moment(date).format("DD MMMM YYYY");
        return begun;
    }

    render(){
        let date=this.returnDate();
        let user={
            name:"Davide",
            avatar_url:'img/avatar.png'
        }
        return(
            <div id="header">
                <AccountDropdown id="Account" user={user}/>
                <div id="titleBarH">
                    <h1>{this.props.title}</h1>
                    <h2>{date}</h2>
                    <h2 id="total">Total item: {this.props.length}</h2>
                </div>
            </div>
        )
    }
}

TitleBar.propTypes = {
    title: propTypes.string.isRequired,
    subtitle: propTypes.string
}