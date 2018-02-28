import React from 'react'
import ReactDOM from 'react-dom'
import propTypes from 'prop-types'

export default class TitleBar extends React.Component{


    returnDate(){
        var date = new Date()
        var begun = moment(date).format("DD MMMM YYYY");
        return begun;
    }
    renderNav(){
        if(!!Meteor.userId()){
            return(
                <div className="navbar">
                    <div className="navbarcontainer">

                        <div className="dropdown">
                            <h3 className="dropbtn">
                                STOCK
                                <i className="fa fa-caret-down"></i>
                            </h3>
                            <div className="dropdown-content">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                        </div>
                        <div className="dropdown">
                            <h3 className="dropbtn">
                                MENU
                                <i className="fa fa-caret-down"></i>
                            </h3>
                            <div className="dropdown-content">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                        </div>
                        <div className="dropdown">
                            <h3 className="dropbtn">
                                PAPERWORK
                                <i className="fa fa-caret-down"></i>
                            </h3>
                            <div className="dropdown-content">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                        </div>
                        <div className="dropdown">
                            <h3 className="dropbtn">
                                EXPENSES
                                <i className="fa fa-caret-down"></i>
                            </h3>
                            <div className="dropdown-content">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
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
                {this.renderNav()}
            </div>

        )
    }
}

TitleBar.propTypes = {
    title: propTypes.string.isRequired,
    subtitle: propTypes.string
}