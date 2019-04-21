import React from 'react';

export default class FormBuilder {
  constructor({ model, onModelChange, errors }) {
    this.model = model;
    this.errors = errors;
    this.onModelChange = onModelChange;
  }

  static registerComponents(components) {
    const componentNames = Object.keys(components);

    componentNames.forEach(componentName => {
      this.registerComponent(componentName, components[componentName]);
    });
  }

  static registerComponent(name, Component) {
    this.prototype[name] = function(name, options = {}) {
      return (
        <Component
          name={name}
          options={options}
          model={this.model}
          errors={this.errors[name] || []}
          onFieldChange={value => {
            this.onModelChange({ ...this.model, [name]: value });
          }}
        />
      );
    }
  }
}
