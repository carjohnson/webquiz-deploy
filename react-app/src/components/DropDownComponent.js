import React, {Component} from "react";
import DropDown from "./DropDown";

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
                <br/>
                <div>
                    <label>
                        Select from list : 
                    </label>

                    
                    <select id='dropdown' onChange={this.handleSelectChange} value={this.state.view}>
                        {/* default option is the first in the list if not defined here */}
                        <option>items ...</option>
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
                    <br/>
                    <label>Item selected : </label>
                    <label>{this.state.view}</label>
                </div>
            </div>
        )
    }
}

export default DropDownComponent
