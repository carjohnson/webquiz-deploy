import React, {Component} from "react";
import RadioBtn from './RadioBtn';


class RadioBtnComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            checkedOptionValue: "",
            options:this.props.arr
        }
    }

    // >>>>>>>>>>>>>>>> I thought I needed this but constructor is accepting props now
    // componentDidMount() {
    //     this.setState({
    //         options: this.props.arr
    //     })
    // }

    handleRadioChange = (e) => this.setState({ checkedOptionValue: e.target.value });

    createRadioBtn = (option,i) => (
        <RadioBtn
          opt={option}
          name={"radio grp1"}
          isSelected={this.state.checkedOptionValue[option]}
          onCheckboxChange={this.handleRadioChange}
          key={i}
          />
      );
    
    createRadioBtns = () => this.state.options.map(this.createRadioBtn);


    render() {
        return (
            <div className="Radio App">
                <div>.</div>
                {this.createRadioBtns()}
                {/* <div>
                    {this.state.options.map((option,i) => (
                        <div key={i}>
                            <input
                                type="radio"
                                name="dynamic-radio"
                                value={option.value}
                                checked={this.state.checkedOptionValue === option.value}
                                onChange={this.handleRadioChange}
                            />
                            <label>{option.label}</label>
                        </div>
                    ))}
                </div>  */}
            </div>
        );
    }
}

export default RadioBtnComponent