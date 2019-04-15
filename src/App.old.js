import React, { Component, Fragment } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      model: {
        name: 'Bob'
      }
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.submitted ? 'true' : 'false'}
          {
            SimpleFormFor({
              model: this.state.model,
              onModelChange: model => {
                this.setState({ ...this.state, model: model });
                console.log(model);
              },
              onSubmit: model => {
                this.setState({ submitted: true, model: model });
                console.log(model);
              }
            }, f => {
              return(
                <Fragment>
                  {f.input('name')}
                  {f.input('age')}
                  {f.input('cpf')}
                  <button>click me</button>
                </Fragment>
              )
            })
          }
        </header>
      </div>
    );
  }
}

function SimpleFormFor({ model, onModelChange, onSubmit }, cb) {
  class Form extends Component {
    constructor(props) {
      super(props);

      this.state = {
        model: { ...model }
      }
    }

    render() {
      return (
        <form onSubmit={event => this._handleSumit(event)}>
          {cb(this)}
        </form>
      );
    }

    input(name) {
      return (
        <div>
          <label>{name}</label>
          <input
            value={this.state.model[name]}
            onChange={event => {
              onModelChange({ ...this.state.model, [name]: event.target.value })
              // this.setState({
              //   ...this.state,
              //   model: { ...this.state.model, [name]: event.target.value }
              // })
            }}
          />
        </div>
      )
    }

    _handleSumit(event) {
      event.preventDefault();
      onSubmit(this.state.model);
    }
  }

  return (<Form></Form>);
}
//
// function SimpleFormFor({ model, onSubmit }, cb) {
//   const formBuilder = new FormBuilder(model, onSubmit, cb);
//   formBuilder.children = cb(formBuilder);
//   return formBuilder.buildComponent();
// }

// class FormBuilder {
//   constructor(model, onSubmit) {
//     console.log(model);
//     this.model = model;
//     this.onSubmit = onSubmit;
//     this.inputsByName = {};
//   }
//
//   input(name) {
//     return (
//       <Input
//         name={name}
//         defaultValue={this.model[name]}
//         onChange={value => this.inputsByName[name] = value}
//       />
//     )
//   }
//
//   buildComponent() {
//     return (
//       <form onSubmit={event => this._handleSumit(event)}>
//         {this.children}
//       </form>
//     );
//   }
//
//   _handleSumit(event) {
//     event.preventDefault();
//     this.onSubmit(this.inputsByName);
//   }
// }

// class Form extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {};
//   }
//
//   render() {
//     <form onSubmit={event => this._handleSumit(event)}>
//       {this.children}
//     </form>
//   }
// }

class Input extends Component {
  render() {
    return (
      <div>
        <label>{this.props.name}</label>
        <input
          onChange={event => this.props.onChange(event.target.value)}
          value={this.props.value}
        />
      </div>
    );
  }
}

export default App;
