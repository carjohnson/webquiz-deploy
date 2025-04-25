import './App.css';
import React, {Component} from 'react';

import FormQuestions from './components/FormQuestions';


class App extends Component {
  render() {
    return(
      <div className="App">
        <FormQuestions />
      </div>
    );
  }
}

export default App;

