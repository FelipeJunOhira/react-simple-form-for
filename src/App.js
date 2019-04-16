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
                {f.select('gender', { collection: { f: 'Female', m: 'Male' } })}
                {f.radio('gender', { collection: { f: 'Female', m: 'Male' } })}
                {f.input('cpf')}
                {f.button('submit')}
              </Fragment>
            )}
          </SimpleFormFor>
          <hr/>
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
                {f.select('gender', { collection: { f: 'Female', m: 'Male' } })}
                {f.radio('gender', { collection: { f: 'Female', m: 'Male' } })}
                {f.input('cpf')}
                {f.button('submit')}
              </Fragment>
            )}
          </SimpleFormFor>
        </header>
      </div>
    );
  }
}

class SimpleFormFor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: props.model,
      isStatefulComponent: !props.onModelChange
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      model: prevState.isStatefulComponent ? prevState.model : nextProps.model
    };
  }

  render() {
    const { model } = this.state;
    const formBuilder = this._buildFormBuilder();

    return (
      <form onSubmit={
        event => {
          event.preventDefault();
          this.props.onSubmit(model);
        }
      }>
        {this.props.children(formBuilder)}
      </form>
    );
  }

  _buildFormBuilder() {
    const { model } = this.state;
    const onModelChange = this.props.onModelChange || this._onModelChange.bind(this);
    const formBuilderClass = this.props.formBuilderClass || FormBuilder;

    return new formBuilderClass({ model, onModelChange });
  }

  _onModelChange(model) {
    console.log('_onModelChange', model);
    this.setState({
      ...this.state,
      model: model
    });
  }
}

class FormBuilder {
  constructor({ model, onModelChange }) {
    this.model = model;
    this.onModelChange = onModelChange;
  }

  static register(name, Component) {
    this.prototype[name] = function(name, options = {}) {
      return (
        <Component
          name={name}
          options={options}
          model={this.model}
          onModelChange={this.onModelChange}
        />
      );
    }
  }
}

FormBuilder.register('input', Input);
// FormBuilder.register('text', TextAreaInput);
// FormBuilder.register('radio_buttons', RadioButtonsInput);
// FormBuilder.register('checkboxes', CheckboxesInput);
// FormBuilder.register('date', DateInput);
FormBuilder.register('select', SelectInput);
FormBuilder.register('radio', RadioInput);
FormBuilder.register('button', ButtonInput);

function Input({ name, options, model, onModelChange }) {
  return (
    <div>
      <label>{name}</label>
      <input
        value={model[name] || ''}
        onChange={
          event => {
            onModelChange({ ...model, [name]: event.target.value });
          }
        }
      />
    </div>
  )
}

function SelectInput({ name, options, model, onModelChange }) {
  const { collection } = options;
  const keys = Object.keys(collection);

  return (
    <div>
      <label>{name}</label>
      <select
        value={model[name] || ''}
        onChange={
          event => {
            onModelChange({ ...model, [name]: event.target.value })
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
}

function RadioInput({ name, options, model, onModelChange }) {
  const { collection } = options;
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
                checked={model[name] === key ? 'checked' : false}
                onChange={
                  event => {
                    onModelChange({ ...model, [name]: event.target.value })
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
}

function ButtonInput({ name, options }) {
  return (
    <button type='submit'>
      {name}
    </button>
  )
}

export default App;
