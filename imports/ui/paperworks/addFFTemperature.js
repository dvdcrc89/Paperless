import React from 'react';
import ReactDOM from 'react-dom'


export default class AddFFTemperature extends React.Component {
    handleSubmit(e) {
    }

    render() {
        return (

            <div className='formstyle'>
                <div className="controllerWrap">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="Fridge/Freezer name" placeholder="F/F name" className="typebox"/>
                        <select name="FFselector" placeholder="">
                            <option value="Fridge">Fridge</option>
                            <option value="Freezer">Fish</option>
                        </select>
                        <input type="number" step="any" name="Temperatur" placeholder="Price"/>
                        <button>Add</button>
                    </form>

                </div>
            </div>

        )
    }
}