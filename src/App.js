import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import { Experiment, Variant, emitter, experimentDebugger } from '@marvelapp/react-ab-test'

experimentDebugger.enable()

emitter.addPlayListener("Test-Addl-Info", function(experimentName, variantName) {
  // Perform any necessary operations to send experiment data to server or analytics provider.
  console.log(`Displaying experiment ${experimentName} variant ${variantName}`);
});

emitter.addWinListener("Test-Addl-Info", function(experimentName, variantName) {
  // Perform any necessary operations to send experiment data to server or analytics provider.
  console.log(
    `Variant ${variantName} of experiment ${experimentName} was clicked`
  );
});

class App extends Component {
  onClick (e) {
    emitter.emitWin('Test-Addl-Info')
  }

  render() {
    return (
      <MuiThemeProvider>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to A/B Testing in React</h1>
            </header>
            <Experiment ref="ab-more-info" name="Test-Addl-Info">
              <Variant name='control'>
                <RaisedButton label="LEARN MORE" primary={true} onClick={this.onClick}/>
              </Variant>
              <Variant name='addl-info'>
                <p>A/B testing is a way to compare two versions of a single variable typically by testing a subject's response to variable A against variable B, and determining which of the two variables is more effective.
                </p>
                <RaisedButton label="LEARN MORE" primary={true} onClick={this.onClick}/>
              </Variant>
            </Experiment>
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
