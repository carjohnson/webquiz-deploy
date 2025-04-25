import React, {Component} from "react";



class FormQuestions extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            data: null, // store async function result here
            option: '',
            results: 'saved',
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

        } catch (error) {
            console.error('Error submitting:', error);
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
                    </div>
                </div>
            </div>
        )
    }

}

export default FormQuestions