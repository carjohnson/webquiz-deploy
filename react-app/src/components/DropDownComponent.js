import React, {Component} from "react";
import DropDown from "./DropDown";

// const DROPDOWNOPTIONS = ["3Planes", "Axial", "Sagittal", "Coronal"];

class DropDownComponent extends Component {

    constructor(props) {
        super(props);
            this.state = {
                view: ""
            }
    }

    handleSelectChange = (e) => this.setState({view: e.target.value });

    createDropDown = () => (

        <DropDown
            isSelected={this.state.view}
            onDropDownChange={this.handleSelectChange}
            arr={this.props.arr}
        />
    )

    render() {
        return(
            <div>
                <div>.</div>
                <div>
                    <label>
                        Select view : 
                    </label>

                    
                    <select id='dropdown' onChange={this.handleSelectChange} value={this.state.view}>
                        {/* default option is the first in the list if not defined here */}
                        <option>options...</option>
                        {/* dynamic render options from list */}
                        {
                            this.props.arr.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))
                        }
                    </select>
 
                    {/* {this.createDropDown()} */}
                    <div>.</div>
                    <label>View selected : </label>
                    <label>{this.state.view}</label>
                </div>
            </div>
        )
    }
}

export default DropDownComponent
