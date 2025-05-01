import React, {Component} from "react";
import RadioBtnComponent from './RadioBtnComponent';
import CheckboxComponent from './CheckboxComponent';
import DropDownComponent from './DropDownComponent';


const RADIOOPTIONS = ["Radio 1", "Radio 2"];
const DROPDOWNOPTIONS = ["Dropdown 1", "Dropdown 2", "Dropdown 3", "Dropdown 4"]


class FormQuestions extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            data: null, // store async function result here
            option: '',
            lsOptions: [],
            results: 'saved',
            checkboxOptions: ["Opt 1", "Opt 2", "Opt 3"],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getApiUrl();  // get dynamic API URL from server
      }
      
    async getApiUrl() {
        try {
          const response = await fetch('/config'); // Get backend config
          const data = await response.json();
          this.setState({data});
          console.log('API URL:', data.apiUrl); // Debugging log
        } catch (error) {
          console.error('Error fetching API URL:', error);
        }
      }

    async getListOptions(){
        try{
            const response = await fetch('/options');
            const data = await response.json();
            console.log('>>> Response >>> : ', response)
            console.log('List of Options: ', data.lsOptions);
            this.setState({lsOptions: data.lsOptions});
        } catch (error) {
            console.error('Error fetching list of options: ', error.message || error);
        }
    }


    // set up handleChange to be generic
    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        
        // fetch('http://localhost:3000', {
        try {
            const response = await fetch(`${this.state.data.apiUrl}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                option: this.state.option,
            }),
            });
            
            const result = await response.json();
            console.log('Server response:', result);
            this.setState({ option: ''});
            this.getListOptions();

        } catch (error) {
            console.error('Error submitting:', error);
        }
    };        
    
    handleUpdate = async () => {
        try {
            // TODO: update function to change the checkbox options
            //       based on the items in the results file
            await this.getListOptions();
            // TODO: quiz needs to be re-rendered
            // this.checkboxRef.updateCheckboxes(this.state.lsOptions);   // update state in CheckboxComponent

            const CHKBOXOPTIONS = this.state.lsOptions;
            this.setState({ checkboxOptions: CHKBOXOPTIONS});
            console.log('In handleUpdate - new checkboxOptions:', this.state.checkboxOptions);

        } catch (error) {
            console.error('Error updating options: ', error);

        }
        
    };


    render(){
        
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 mt-5 mb-5">
                        <h2 className="mb-4">Quiz Elements</h2>
                        {/* <form method="POST" action="/" autoComplete="off" onSubmit={this.handleSubmit}> */}
                        <form onSubmit={this.handleSubmit}>
                        <div className="input-container">
                            <label  form="#optionlabel">Option: </label>
                            <input id='#option' type='text' name='option' value={this.state.option} placeholder='Enter option' onChange={this.handleChange}  required="required"/>
                            <div className="bar"/>
                        </div>
                        <div className="button-container">
                            <br />
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={this.state.results === "not saved"}
                            >
                                Add
                            </button>
                        </div>
                        </form>
                        <form>
                        <br />
                        <br />
                        <div>===  Form - Components  ===</div>
                        <br />
                        <div className="form-group">

                            <CheckboxComponent
                                arr={this.state.checkboxOptions}
                                // arr={this.state.lsOptions}
                                //  ref={(ref) => (this.checkboxRef = ref)}  // Reference to child component
                            />
                            <RadioBtnComponent arr={RADIOOPTIONS}/>
                            <DropDownComponent arr={DROPDOWNOPTIONS}/>

                            <br />
                            <br />
                            <div>=== TODO - update options ===</div>
                            <br />
                            </div>
                            <button onClick={this.handleUpdate} > Update </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default FormQuestions