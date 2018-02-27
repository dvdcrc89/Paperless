import React from "react";
import TitleBar from './titlebar'
import {history} from "../routes/routes";

export default class NotFound extends React.Component {
    render() {
        return (
            <div className="container">
                <button onClick={() => {
                    history.goBack()
                }
                }>Back
                </button>
                <TitleBar title="Page not found"/>

                <img className="img404" src="./../../../img/404.jpg"></img>

            </div>)
    }
}