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

          <SimpleFormFor
            model={this.state.model}
            onModelChange={
              model => {
                this.setState({ ...this.state, model: model });
                console.log(model);
              }
            }
            onSubmit={
              model => {
                this.setState({ submitted: true, model: model });
                console.log(model);
              }
            }
          >
            {f => (
              <Fragment>
                {f.input('name')}
                {f.input('age')}
                {f.select('gender', { f: 'Female', m: 'Male' })}
                {f.radio('gender', { f: 'Female', m: 'Male' })}
                {f.input('cpf')}
                <button>click me</button>
              </Fragment>
            )}
          </SimpleFormFor>
        </header>
      </div>
    );
  }
}

function SimpleFormFor({ model, onModelChange, onSubmit, content, children }) {
  const formBuilder = new FormBuilder({ model, onModelChange });

  return (
    <form onSubmit={
      event => {
        event.preventDefault();
        onSubmit(model);
      }
    }>
      {children(formBuilder)}
    </form>
  );
}

class FormBuilder {
  constructor({ model, onModelChange }) {
    this.model = model;
    this.onModelChange = onModelChange;
  }

  static register(name, callback) {
    this.prototype[name] = callback;
  }
}

FormBuilder.register('input', function(name) {
  return (
    <div>
      <label>{name}</label>
      <input
        value={this.model[name] || ''}
        onChange={
          event => {
            this.onModelChange({ ...this.model, [name]: event.target.value })
          }
        }
      />
    </div>
  )
})

FormBuilder.register('select', function(name, collection) {
  const keys = Object.keys(collection);

  return (
    <div>
      <label>{name}</label>
      <select
        value={this.model[name] || ''}
        onChange={
          event => {
            this.onModelChange({ ...this.model, [name]: event.target.value })
          }
        }
      >
        {
          keys.map((key, index) => {
            return (
              <option key={index} value={key}>{collection[key]}</option>
            );
          })
        }
      </select>
    </div>
  )
})

FormBuilder.register('radio', function(name, collection) {
  const keys = Object.keys(collection);

  return (
    <div>
      <label>{name}</label>

      {
        keys.map((key, index) => {
          return (
            <span key={index}>
              <input
                type="radio"
                name={name}
                value={key}
                checked={this.model[name] === key ? 'checked' : false}
                onChange={
                  event => {
                    this.onModelChange({ ...this.model, [name]: event.target.value })
                  }
                }
                />
              {collection[key]}
            </span>
          );
        })
      }
    </div>
  )
})

export default App;
