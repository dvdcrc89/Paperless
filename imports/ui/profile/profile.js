import TitleBar from '../generic/titlebar';
import React from 'react'
import Table from '../generic/table'
import {Accounts} from "meteor/accounts-base";
import {history} from "../routes/routes";
import {Meteor} from 'meteor/meteor';
export default class Profile extends React.Component {

        getUser(){
            if(Meteor.user()) {
                return Meteor.user().emails[0].address;
            }
        }

        render()
        {
            return (
                <div className="container">

                    <TitleBar title="Profile" mainData={this.getUser()}/>




                    {/*<Table/>*/}
                </div>)
        }
    }
