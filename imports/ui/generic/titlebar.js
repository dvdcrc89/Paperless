import React from 'react'
import ReactDOM from 'react-dom'
import propTypes from 'prop-types'

export default class TitleBar extends React.Component{


    returnDate(){
        var date = new Date()
        var begun = moment(date).format("DD MMMM YYYY");
        return begun;
    }

    render(){
        let date=this.returnDate();

        return(
            <div className="header">
                <div className="titleBar">
                    <h2 className="titleDate">{date}</h2>
                    <h1>{this.props.title}</h1>
                    <h2 className="titleMainData" >{this.props.mainData}</h2>
                </div>
            </div>
        )
    }
}

TitleBar.propTypes = {
    title: propTypes.string.isRequired,
    subtitle: propTypes.string
}