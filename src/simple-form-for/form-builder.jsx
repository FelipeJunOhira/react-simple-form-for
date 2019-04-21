import React from 'react';

export default class FormBuilder {
  constructor({ model, onModelChange }) {
    this.model = model;
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
          onModelChange={this.onModelChange}
        />
      );
    }
  }
}
