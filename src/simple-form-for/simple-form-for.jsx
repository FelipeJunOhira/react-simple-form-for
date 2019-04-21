import React, { Component } from 'react';

import FormBuilder from './form-builder';
import defaultTheme from './theme/default';

export default class SimpleFormFor extends Component {
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
      <form
        className={`simple-form-for ${this.currentTheme.formClasses}`}
        onSubmit={
          event => {
            event.preventDefault();
            this.props.onSubmit(model);
          }
        }
      >
        {this.props.children(formBuilder)}
      </form>
    );
  }

  get currentTheme() {
    return this.props.theme || this.context;
  }

  _buildFormBuilder() {
    const { model } = this.state;
    const onModelChange = this.props.onModelChange || this._onModelChange.bind(this);

    class FormBuilderSublass extends FormBuilder {};

    FormBuilderSublass.registerComponents(this.currentTheme.components);

    return new FormBuilderSublass({ model, onModelChange });
  }

  _onModelChange(model) {
    this.setState({
      ...this.state,
      model: model
    });
  }
}

const ThemeContext = React.createContext(defaultTheme);

SimpleFormFor.contextType = ThemeContext;

export { ThemeContext };
