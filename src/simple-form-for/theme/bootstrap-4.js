import React from 'react';

const theme = {
  formClasses: '',
  components: {
    input: TextInput,
    select: SelectInput,
    radio: RadioInput,
    button: ButtonInput
  }
};

export default theme;

function TextInput({ name, options, model, onModelChange }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{name}</label>
      <input
        type="text"
        className="form-control"
        id={name}
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
    <div className="form-group">
      <label htmlFor={name}>{name}</label>
      <select
        className="form-control"
        id={name}
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
    <div className="form-group">
      <label>{name}</label>
      <div>
        {
          keys.map((key, index) => {
            return (
              <div className="form-check form-check-inline" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={name}
                  id={`${name}_${collection[key]}`}
                  value={key}
                  checked={model[name] === key ? 'checked' : false}
                  onChange={
                    event => {
                      onModelChange({ ...model, [name]: event.target.value })
                    }
                  }
                />
              <label className="form-check-label" htmlFor={`${name}_${collection[key]}`}>{collection[key]}</label>
              </div>
            );
          })
        }
      </div>
    </div>
  )
}

function ButtonInput({ name, options }) {
  return (
    <button type='submit' className="btn btn-primary">
      {name}
    </button>
  )
}
