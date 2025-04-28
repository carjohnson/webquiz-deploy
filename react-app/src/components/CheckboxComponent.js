import React, {Component} from "react";
import Checkbox from "./Checkbox";


class CheckboxComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            checkboxes: this.props.arr.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false
                }),
                {}
                ),
        }
    }


    selectAllCheckboxes = isSelected => {
        Object.keys(this.state.checkboxes).forEach(checkbox => {
          // BONUS: Can you explain why we pass updater function to setState instead of an object?
          this.setState(prevState => ({
            checkboxes: {
              ...prevState.checkboxes,
              [checkbox]: isSelected
            }
          }));
        });
      };
    
      selectAll = () => this.selectAllCheckboxes(true);
    
      deselectAll = () => this.selectAllCheckboxes(false);
    

    handleCheckboxChange = changeEvent => {
        const { name } = changeEvent.target;

        this.setState(prevState => ({
            checkboxes: {
                ...prevState.checkboxes,
                [name]: !prevState.checkboxes[name]
            }
        }));
    };

    createCheckbox = (option,i) => (
        <Checkbox
          label={option}
          isSelected={this.state.checkboxes[option]}
          onCheckboxChange={this.handleCheckboxChange}
          key={i}
          />
      );
    
    // also works: ...this.props.arr.map(...)
    createCheckboxes = () => Object.keys(this.state.checkboxes).map(this.createCheckbox);


    render() {
        return(
            <div className="Checkbox App">
                <div>
                    {this.createCheckboxes()}
                    
                    {/* {this.props.arr.map((option,i) => (
                        <div className="form-check" key={i}>
                            <label>
                            <input
                                type="checkbox"
                                name={option}
                                checked={this.state.checkboxes[option]}
                                onChange={this.handleCheckboxChange}
                                className="form-check-input"
                            />
                            {option}
                            </label>
                        </div>
                    ))} */}
                    

                    <div className="form-group">
                        <button
                            type = "button"
                            className="btn"
                            onClick={this.selectAll}
                        >
                            Select All
                        </button>
                        <button
                            type = "button"
                            className="btn"
                            onClick={this.deselectAll}
                        >
                            Deselect All
                        </button>
                    </div>
                </div>
            </div>
        )
    }


    }

    export default CheckboxComponent