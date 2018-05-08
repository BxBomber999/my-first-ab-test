Getting your feet wet with A/B Testing in React

A/B testing is a deep subject, but getting set up in React is easy. In this article you will:

1. Learn the basics of what A/B testing is and why it is important
2. Write your first A/B test in React using the react-ab-test library

So, what is it?

AB testing (also called split-testing) is a form of experimentation that presents two different versions of a website to a set of users, to test which version is better.

The version that any one user will see is random, but the two versions are presented simultaneously to a group of visitors to the site.  If one version performed (statistically) significantly better than the other, then it wins.  The winning version is now presented to users and the process can begin again with another set of criteria.

Why is this important?

The method is commonly used to maximize revenue from users by testing marketing materials, calls to action, landing pages, etc. until the optimal mix is found.  But A/B testing can reveal more than just you users color and button size preferences.  Good A/B tests can also reveal patterns about your users beliefs, motivations, and more.  You can use this information to better understand and serve your customers.

The secret sauce behind A/B testing is the concept of evidence-based decision making.  Back your product decisions up with data, prove that the changes you make work for your users, and then you can move forward with confidence.

Write your first A/B test in React

Open the terminal, navigate to your desired directory and run the following commands:

```shell
npm install create-react-app
create-react-app my-first-ab-test
```

Create react app is a great library to get your React projects started quickly.  We will only make minor changes to their boilerplate to demonstrate our simple A/B Test.

So far you have, 1) installed the create-react-app library, 2) created a new React project in the my-first-ab-test directory.

Once the necessary dependancies are finished loading:

```shell
cd my-first-ab-test
npm install @marvelapp/react-ab-test material-ui
```

We are going the use the material-ui design library to grab some basic components.
We are using @marvelapp’s fork of the ‘react-ab-test’ library so that it works with the latest version of react.
OK - now run npm start, the following should appear in your browser:


INSERT IMAGE 1

Great!  Now go back to your terminal and navigate to the /src/App.js file.  We will write our test in here.  Replace the current text with the following:

```js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to A/B Testing in React</h1>
            </header>
            <RaisedButton label="LEARN MORE" primary={true} />
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
```

We now have a “Learn More” button for anyone who comes to our site and is interested in more information about A/B testing.  This is the bare minimum we might need for this page and a good point to run an experiment.

Lets say that we want people to click on our button and explore our site further.  This can be referred to as our “Win” condition.  What could make more people click?

Every A/B test should begin with a Hypothesis to test.

My hypothesis: if we provided some additional information about how useful AB testing is, a visitor will be more likely to click the Learn More button.  That sounds plausible, but we won’t know if it actually works until we test it.  Heres how we do it.

First lets import everything we will need from the react-ab-test library and enable the debugger, a very nifty tool for this library.

```js
import { Experiment, Variant, emitter, experimentDebugger } from '@marvelapp/react-ab-test'

experimentDebugger.enable()
```

Next lets add our experiment.  Insert the following right below our header, replacing the RaisedButton.

```js
<Experiment ref="ab-more-info" name="Test-Addl-Info">
  <Variant name='control'>
    <RaisedButton label="LEARN MORE" primary={true}/>
  </Variant>
  <Variant name='addl-info'>
    <p>A/B testing is a way to compare two versions of a single variable typically by testing a subject's response to variable A against variable B, and determining which of the two variables is more effective.
    </p>
    <RaisedButton label="LEARN MORE" primary={true}/>
  </Variant>
</Experiment>
```

Save your App.js file and check your browser,  You should now see a little tab at the bottom of the page that will allow you to switch between the Variants.  Here is what you did:

1. You defined an experiment with the Experiment tag, giving it a reference string and a name.  Every experiment needs a name and can only have "Variant"s as child objects.
2. Next you added two variants, one is our control - the orignal page with just the Learn More button.  The other named 'addl-info' provides some extra details on what A/B testing is to entice the user.

The library will randomly present only one of the Variants to each user.  Now we need a way to determine which variant is better.

Modify the code as follows:

1. Add an onClick class method to our App, and hook it up to our RaisedButton's in both Variants.

```js
  // onClick calls the emitWin method on the emitter, which will push an event to any listeners.
  onClick (e) {
    emitter.emitWin('Test-Addl-Info')
  }
  // ...
  // Call the onClick method when the button is pressed.
  <RaisedButton label="LEARN MORE" primary={true} onClick={this.onClick}/>
```

Next lets add our listeners outside our App class:
```js
  // We want to add a 'play listener to record every instance a user sees a variant.
emitter.addPlayListener("Test-Addl-Info", function(experimentName, variantName) {
console.log(`Displaying experiment ${experimentName} variant ${variantName}`);
// Perform any necessary operations to send experiment data to server or analytics provider.
});

// The win listener is only called when the Win condition is met, in this instance, when the Learn More button is pressed.
emitter.addWinListener("Test-Addl-Info", function(experimentName, variantName) {
  console.log(`Variant ${variantName} of experiment ${experimentName} was clicked`);
  // Perform any necessary operations to send experiment data to server or analytics provider.
});
```

The listeners take two arguments, the test name and a callback function.  The callback function takes the experimentName and variantName and console logs both.  This is where you would usually send data back to your server or to your analytics provider to collect and analyze.

Congratulations! You have now written your first A/B test.  Hopefully, you can see how easy it was to implement A/B tests in React and you are interested in running some tests in your projects.

Please Star this repo if you enjoyed this tutorial.
